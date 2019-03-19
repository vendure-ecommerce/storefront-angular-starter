import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import gql from 'graphql-tag';
import { merge, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GetCartTotals } from '../../generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';
import { CART_FRAGMENT } from '../../types/fragments.graphql';

import { GET_CART_TOTALS } from './cart-toggle.graphql';

@Component({
    selector: 'vsf-cart-toggle',
    templateUrl: './cart-toggle.component.html',
})
export class CartToggleComponent implements OnInit {
    @Output() toggle = new EventEmitter<void>();
    cart$: Observable<{ total: number; quantity: number; }>;

    constructor(private dataService: DataService,
                private stateService: StateService) {}

    ngOnInit() {
        this.cart$ =  merge(
            this.stateService.select(state => state.activeOrderId),
            this.stateService.select(state => state.signedIn),
        ).pipe(
            switchMap(() => this.dataService.query<GetCartTotals.Query>(GET_CART_TOTALS)),
            map(({ activeOrder }) => {
                return {
                    total: activeOrder ? activeOrder.total : 0,
                    quantity: activeOrder ? activeOrder.lines.reduce((qty, line) => qty + line.quantity, 0) : 0,
                };
            }),
        );
    }
}
