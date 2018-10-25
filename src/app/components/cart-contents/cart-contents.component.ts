import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { AdjustItemQuantity, Cart, GetCartContents, RemoveItemFromCart } from '../../../../codegen/generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { ADJUST_ITEM_QUANTITY, GET_CART_CONTENTS, REMOVE_ITEM_FROM_CART } from './cart-contents.graphql';

@Component({
    selector: 'vsf-cart-contents',
    templateUrl: './cart-contents.component.html',
    styleUrls: ['./cart-contents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContentsComponent implements OnInit {
    cart$: Observable<any>;

    constructor(private dataService: DataService,
                private stateService: StateService) {}

    ngOnInit() {
        this.cart$ = this.stateService.select(state => state.signedIn).pipe(
            switchMap(() => this.dataService.query<GetCartContents.Query, GetCartContents.Variables>(GET_CART_CONTENTS)),
            map(data => data.activeOrder)
        );
    }

    increment(item: Cart.Lines) {
        this.adjustItemQuantity(item.id, item.quantity + 1);
    }

    decrement(item: Cart.Lines) {
        if (item.quantity > 1) {
            this.adjustItemQuantity(item.id, item.quantity - 1);
        } else {
            this.removeItem(item.id);
        }
    }

    /**
     * Filters out the Promotion adjustments for an OrderLine and aggregates the discount.
     */
    getLinePromotions(adjustments: Cart.Adjustments[]) {
        const groupedPromotions = adjustments.filter(a => a.type === 'PROMOTION')
            .reduce((groups, promotion) => {
                if (!groups[promotion.description]) {
                    groups[promotion.description] = promotion.amount;
                } else {
                    groups[promotion.description] += promotion.amount;
                }
                return groups;
            }, {});
        return Object.entries(groupedPromotions).map(([key, value]) => ({ description: key, amount: value }));
    }

    private adjustItemQuantity(id: string, qty: number) {
        this.dataService.mutate<AdjustItemQuantity.Mutation, AdjustItemQuantity.Variables>(ADJUST_ITEM_QUANTITY, {
            id,
            qty,
        }).pipe(
            take(1),
        ).subscribe(data => {
            console.log(data);
        });
    }

    private removeItem(id: string) {
        this.dataService.mutate<RemoveItemFromCart.Mutation, RemoveItemFromCart.Variables>(REMOVE_ITEM_FROM_CART, {
            id,
        }).pipe(
            take(1),
        ).subscribe(data => {
            console.log(data);
        });
    }
}
