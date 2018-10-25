import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../providers/data.service';
import { CART_FRAGMENT } from '../../types/fragments.graphql';
import { GET_CART_TOTALS } from './cart-toggle.graphql';
import { GetCartTotals } from '../../../../codegen/generated-types';

@Component({
    selector: 'vsf-cart',
    templateUrl: './cart-toggle.component.html',
    styleUrls: ['./cart-toggle.component.scss'],
})
export class CartToggleComponent implements OnInit {
    @Output() toggle = new EventEmitter<void>();
    cart$: Observable<{ total: number; quantity: number; }>;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.cart$ = this.dataService.query<GetCartTotals.Query>(GET_CART_TOTALS).pipe(
            map(({ activeOrder }) => {
                return {
                    total: activeOrder.total,
                    quantity: activeOrder.lines.reduce((qty, line) => qty + line.quantity, 0),
                };
            }),
        );
    }

}
