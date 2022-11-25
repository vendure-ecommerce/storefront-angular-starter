import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import {
    AddressFragment,
    CreateAddressInput,
    GetAvailableCountriesQuery,
    GetCustomerAddressesQuery,
    GetEligibleShippingMethodsQuery,
    GetShippingAddressQuery,
    SetCustomerForOrderMutation,
    SetCustomerForOrderMutationVariables,
    SetShippingAddressMutation,
    SetShippingAddressMutationVariables,
    SetShippingMethodMutation,
    SetShippingMethodMutationVariables,
    TransitionToArrangingPaymentMutation
} from '../../../common/generated-types';
import { GET_AVAILABLE_COUNTRIES, GET_CUSTOMER_ADDRESSES } from '../../../common/graphql/documents.graphql';
import { notNullOrUndefined } from '../../../common/utils/not-null-or-undefined';
import { DataService } from '../../../core/providers/data/data.service';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { NotificationService } from '../../../core/providers/notification/notification.service';
import { StateService } from '../../../core/providers/state/state.service';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form.component';
import { AddressModalComponent } from '../../../shared/components/address-modal/address-modal.component';

import {
    GET_ELIGIBLE_SHIPPING_METHODS,
    GET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_ADDRESS,
    SET_SHIPPING_METHOD,
    TRANSITION_TO_ARRANGING_PAYMENT,
} from './checkout-shipping.graphql';

export type AddressFormValue = Pick<AddressFragment, Exclude<keyof AddressFragment, 'country'>> & { countryCode: string; };

@Component({
    selector: 'vsf-checkout-shipping',
    templateUrl: './checkout-shipping.component.html',
    // styleUrls: ['./checkout-shipping.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit {
    @ViewChild('addressForm') addressForm: AddressFormComponent;

    customerAddresses$: Observable<AddressFragment[]>;
    availableCountries$: Observable<GetAvailableCountriesQuery['availableCountries']>;
    eligibleShippingMethods$: Observable<GetEligibleShippingMethodsQuery['eligibleShippingMethods']>;
    shippingAddress$: Observable<NonNullable<GetShippingAddressQuery['activeOrder']>['shippingAddress'] | null | undefined>;
    signedIn$: Observable<boolean>;
    shippingMethodId: string | undefined;
    step: 'selectAddress' | 'customerDetails' | 'editAddress' | 'selectMethod' = 'selectAddress';
    firstName = '';
    lastName = '';
    emailAddress = '';

    constructor(private dataService: DataService,
                private stateService: StateService,
                private changeDetector: ChangeDetectorRef,
                private modalService: ModalService,
                private notificationService: NotificationService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.signedIn$ = this.stateService.select(state => state.signedIn);
        this.customerAddresses$ = this.dataService.query<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES).pipe(
            map(data => data.activeCustomer ? data.activeCustomer.addresses || [] : []),
        );
        this.availableCountries$ = this.dataService.query<GetAvailableCountriesQuery>(GET_AVAILABLE_COUNTRIES).pipe(
            map(data => data.availableCountries),
        );
        this.shippingAddress$ = this.dataService.query<GetShippingAddressQuery>(GET_SHIPPING_ADDRESS).pipe(
            map(data => data.activeOrder && data.activeOrder.shippingAddress),
        );
        this.eligibleShippingMethods$ = this.shippingAddress$.pipe(
            switchMap(() => this.dataService.query<GetEligibleShippingMethodsQuery>(GET_ELIGIBLE_SHIPPING_METHODS)),
            map(data => data.eligibleShippingMethods),
        );
        combineLatest(this.signedIn$, this.customerAddresses$).pipe(
            take(1),
        ).subscribe(([signedIn, addresses]) => {
            this.step = signedIn ? (addresses.length ? 'selectAddress' : 'editAddress') : 'customerDetails';
        });
    }

    getLines(address: Address.Fragment): string[] {
        return [
            address.fullName,
            address.company,
            address.streetLine1,
            address.streetLine2,
            address.province,
            address.postalCode,
            address.country.name,
        ].filter(notNullOrUndefined);
    }

    createAddress() {
        this.modalService.fromComponent(AddressModalComponent, {
            locals: {
                title: 'Create new address',
            },
            closable: true,
        }).pipe(
            switchMap(() => this.dataService.query<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES, null, 'network-only')),
        )
            .subscribe();
    }

    editAddress(address: AddressFragment) {
        this.addressForm.addressForm.patchValue({...address, countryCode: address.country.code});
    }

    setCustomerDetails() {
        this.addressForm.addressForm.patchValue({
            fullName: `${this.firstName} ${this.lastName}`,
        });
        this.step = 'editAddress';
    }

    setShippingAddress(value: AddressFormValue | AddressFragment) {
        const input = this.valueToAddressInput(value);
        this.dataService.mutate<SetShippingAddressMutation, SetShippingAddressMutationVariables>(SET_SHIPPING_ADDRESS, {
            input,
        }).subscribe(data => {
            this.step = 'selectMethod';
            this.changeDetector.markForCheck();
        });
    }

    proceedToPayment() {
        const shippingMethodId = this.shippingMethodId;
        if (shippingMethodId) {
            this.stateService.select(state => state.signedIn).pipe(
                mergeMap(signedIn => !signedIn ? this.setCustomerForOrder() || of({}) : of({})),
                mergeMap(() =>
                    this.dataService.mutate<SetShippingMethodMutation, SetShippingMethodMutationVariables>(SET_SHIPPING_METHOD, {
                        id: shippingMethodId,
                    }),
                ),
                mergeMap(() => this.dataService.mutate<TransitionToArrangingPaymentMutation>(TRANSITION_TO_ARRANGING_PAYMENT)),
            ).subscribe((data) => {
                this.router.navigate(['../payment'], { relativeTo: this.route });
            });
        }
    }

    private setCustomerForOrder() {
        if (this.emailAddress) {
            return this.dataService.mutate<SetCustomerForOrder.Mutation, SetCustomerForOrder.Variables>(SET_CUSTOMER_FOR_ORDER, {
                input: {
                    emailAddress: this.emailAddress,
                    firstName: this.firstName,
                    lastName: this.lastName,
                },
            }).pipe(
                tap(({ setCustomerForOrder }) => {
                    if (setCustomerForOrder && setCustomerForOrder.__typename !== 'Order') {
                        this.notificationService.error((setCustomerForOrder as any).message);
                    }
                })
            )
        }
    }

    private valueToAddressInput(value: AddressFormValue | AddressFragment): CreateAddressInput {
        return {
            city: value.city || '',
            company: value.company || '',
            countryCode: this.isFormValue(value) ? value.countryCode : value.country.code,
            defaultBillingAddress: value.defaultBillingAddress,
            defaultShippingAddress: value.defaultShippingAddress,
            fullName: value.fullName || '',
            phoneNumber: value.phoneNumber || '',
            postalCode: value.postalCode || '',
            province: value.province || '',
            streetLine1: value.streetLine1 || '',
            streetLine2: value.streetLine2 || '',
        };
    }

    private isFormValue(input: AddressFormValue | AddressFragment): input is AddressFormValue {
        return typeof (input as any).countryCode === 'string';
    }
}
