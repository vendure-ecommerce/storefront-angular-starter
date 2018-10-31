import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';

import { GetOrderForCheckout } from '../../../../codegen/generated-types';
import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { DataService } from '../data.service';

import { GET_ORDER_FOR_CHECKOUT } from './checkout-resolver.graphql';

@Injectable({ providedIn: 'root' })
export class CheckoutResolver implements Resolve<any> {

    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<GetOrderForCheckout.ActiveOrder>> {
        const activeOrder$ = this.dataService.query<GetOrderForCheckout.Query>(GET_ORDER_FOR_CHECKOUT).pipe(
            map(data => data.activeOrder),
        );

        const stream = activeOrder$.pipe(
            filter(notNullOrUndefined),
            shareReplay(1),
        );

        return stream.pipe(
            take(1),
            map(() => stream),
        );
    }
}
