import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetOrderForCheckout } from '../../../../codegen/generated-types';
import { CheckoutPaymentComponent } from '../../components/checkout-payment/checkout-payment.component';
import { CheckoutShippingComponent } from '../../components/checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from '../../components/checkout-sign-in/checkout-sign-in.component';
import { DataService } from '../data.service';

import { GET_ORDER_FOR_CHECKOUT } from './checkout-resolver.graphql';

@Injectable({ providedIn: 'root' })
export class CheckoutGuard implements CanActivate {

    constructor(private router: Router, private dataService: DataService) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        // return route.parent && route.parent.data.activeOrder && route.parent.data.activeOrder.pipe(
        return this.dataService.query<GetOrderForCheckout.Query>(GET_ORDER_FOR_CHECKOUT, undefined, 'cache-first').pipe(
            map(data => data.activeOrder),
            map((activeOrder: GetOrderForCheckout.ActiveOrder) => {
                const component = route.component;

                if ((component === CheckoutShippingComponent) || (component === CheckoutSignInComponent)) {
                    if (activeOrder.state === 'AddingItems') {
                        return true;
                    } else if (activeOrder.state === 'ArrangingPayment') {
                        this.router.navigate(['/checkout', 'payment']);
                        return false;
                    } else {
                        return false;
                    }
                } else if (component === CheckoutPaymentComponent) {
                    if (activeOrder.state === 'ArrangingPayment') {
                        return true;
                    } else if (activeOrder.state === 'AddingItems') {
                        this.router.navigate(['/checkout']);
                        return false;
                    } else {
                        return false;
                    }
                }

                return true;
            }),
        );
    }
}
