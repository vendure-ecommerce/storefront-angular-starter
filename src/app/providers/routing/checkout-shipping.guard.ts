import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetActiveOrder } from '../../../../codegen/generated-types';
import ActiveOrder = GetActiveOrder.ActiveOrder;

@Injectable({ providedIn: 'root' })
export class CheckoutShippingGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return route.parent && route.parent.data.activeOrder && route.parent.data.activeOrder.pipe(
            map((activeOrder: ActiveOrder) => {
                if (activeOrder.state === 'AddingItems') {
                    return true;
                } else if (activeOrder.state === 'ArrangingPayment') {
                    this.router.navigate(['/checkout', 'payment']);
                    return false;
                } else {
                    return false;
                }
            }),
        );
    }
}
