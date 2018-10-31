import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import EligibleShippingMethods = GetEligibleShippingMethods.EligibleShippingMethods;
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import {
    GetAvailableCountries,
    GetEligibleShippingMethods,
    GetShippingAddress,
    SetShippingAddress, SetShippingMethod, TransitionToArrangingPayment,
} from '../../../../codegen/generated-types';
import { DataService } from '../../providers/data.service';
import { AddressFormComponent } from '../address-form/address-form.component';

import {
    GET_AVAILABLE_COUNTRIES,
    GET_ELIGIBLE_SHIPPING_METHODS,
    GET_SHIPPING_ADDRESS,
    SET_SHIPPING_ADDRESS, SET_SHIPPING_METHOD, TRANSITION_TO_ARRANGING_PAYMENT,
} from './checkout-shipping.graphql';

@Component({
    selector: 'vsf-checkout-shipping',
    templateUrl: './checkout-shipping.component.html',
    styleUrls: ['./checkout-shipping.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit {
    @ViewChild('addressForm') addressForm: AddressFormComponent;

    availableCountries$: Observable<GetAvailableCountries.AvailableCountries[]>;
    eligibleShippingMethods$: Observable<EligibleShippingMethods[]>;
    shippingAddress$: Observable<GetShippingAddress.ShippingAddress | null | undefined>;
    shippingMethodId: string | undefined;
    step = 0;

    constructor(private dataService: DataService,
                private changeDetector: ChangeDetectorRef,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
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
    }

    setShippingAddress(value: any) {
        this.dataService.mutate<SetShippingAddress.Mutation, SetShippingAddress.Variables>(SET_SHIPPING_ADDRESS, {
            input: value,
        }).subscribe(data => {
            this.step = 1;
            this.changeDetector.markForCheck();
        });
    }

    proceedToPayment() {
        if (this.shippingMethodId) {
            this.dataService.mutate<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
                id: this.shippingMethodId,
            }).pipe(
                mergeMap(() => this.dataService.mutate<TransitionToArrangingPayment.Mutation>(TRANSITION_TO_ARRANGING_PAYMENT)),
            ).subscribe((data) => {
                this.router.navigate(['../payment'], { relativeTo: this.route });
            });
        }
    }
}
