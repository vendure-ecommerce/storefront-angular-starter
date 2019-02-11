import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import {
    Address,
    GetAvailableCountries,
    GetCustomerAddresses,
    GetEligibleShippingMethods,
    GetShippingAddress,
    SetCustomerForOrder,
    SetShippingAddress,
    SetShippingMethod,
    TransitionToArrangingPayment,
} from '../../../../codegen/generated-types';
import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';
import { AddressFormComponent } from '../address-form/address-form.component';

import {
    GET_AVAILABLE_COUNTRIES,
    GET_CUSTOMER_ADDRESSES,
    GET_ELIGIBLE_SHIPPING_METHODS,
    GET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_ADDRESS,
    SET_SHIPPING_METHOD,
    TRANSITION_TO_ARRANGING_PAYMENT,
} from './checkout-shipping.graphql';
import EligibleShippingMethods = GetEligibleShippingMethods.EligibleShippingMethods;

@Component({
    selector: 'vsf-checkout-shipping',
    templateUrl: './checkout-shipping.component.html',
    styleUrls: ['./checkout-shipping.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit {
    @ViewChild('addressForm') addressForm: AddressFormComponent;

    customerAddresses$: Observable<Address.Fragment[]>;
    availableCountries$: Observable<GetAvailableCountries.AvailableCountries[]>;
    eligibleShippingMethods$: Observable<EligibleShippingMethods[]>;
    shippingAddress$: Observable<GetShippingAddress.ShippingAddress | null | undefined>;
    signedIn$: Observable<boolean>;
    shippingMethodId: string | undefined;
    step: 'selectAddress' | 'customerDetails' | 'editAddress' | 'selectMethod' = 'selectAddress';
    firstName = '';
    lastName = '';
    emailAddress = '';

    constructor(private dataService: DataService,
                private stateService: StateService,
                private changeDetector: ChangeDetectorRef,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.signedIn$ = this.stateService.select(state => state.signedIn);
        this.customerAddresses$ = this.dataService.query<GetCustomerAddresses.Query>(GET_CUSTOMER_ADDRESSES).pipe(
            map(data => data.activeCustomer ? data.activeCustomer.addresses || [] : []),
        );
        this.availableCountries$ = this.dataService.query<GetAvailableCountries.Query>(GET_AVAILABLE_COUNTRIES).pipe(
            map(data => data.availableCountries),
        );
        this.shippingAddress$ = this.dataService.query<GetShippingAddress.Query>(GET_SHIPPING_ADDRESS).pipe(
            map(data => data.activeOrder && data.activeOrder.shippingAddress),
        );
        this.eligibleShippingMethods$ = this.shippingAddress$.pipe(
            switchMap(() => this.dataService.query<GetEligibleShippingMethods.Query>(GET_ELIGIBLE_SHIPPING_METHODS)),
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

    editAddress(address: Address.Fragment) {
        this.addressForm.addressForm.patchValue(address);
        this.step = 'editAddress';
    }

    setCustomerDetails() {
        this.addressForm.addressForm.patchValue({
            fullName: `${this.firstName} ${this.lastName}`,
        });
        this.step = 'editAddress';
    }

    setShippingAddress(value: any) {
        this.dataService.mutate<SetShippingAddress.Mutation, SetShippingAddress.Variables>(SET_SHIPPING_ADDRESS, {
            input: value,
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
                    this.dataService.mutate<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
                        id: shippingMethodId,
                    }),
                ),
                mergeMap(() => this.dataService.mutate<TransitionToArrangingPayment.Mutation>(TRANSITION_TO_ARRANGING_PAYMENT)),
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
            });
        }
    }
}
