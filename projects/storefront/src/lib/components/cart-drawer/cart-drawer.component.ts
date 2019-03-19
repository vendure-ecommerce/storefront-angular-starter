import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { AdjustItemQuantity, GetActiveOrder, RemoveItemFromCart } from '../../generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { ADJUST_ITEM_QUANTITY, GET_ACTIVE_ORDER, REMOVE_ITEM_FROM_CART } from './cart-drawer.graphql';

@Component({
    selector: 'vsf-cart-drawer',
    templateUrl: './cart-drawer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawerComponent implements OnInit {
    @HostBinding('class.visible')
    @Input() visible = false;
    @Output() close = new EventEmitter<void>();

    cart$: Observable<GetActiveOrder.ActiveOrder | null | undefined>;

    constructor(private dataService: DataService,
                private stateService: StateService) {}

    ngOnInit() {
        this.cart$ = merge(
            this.stateService.select(state => state.activeOrderId),
            this.stateService.select(state => state.signedIn),
        ).pipe(
            switchMap(() => this.dataService.query<GetActiveOrder.Query, GetActiveOrder.Variables>(GET_ACTIVE_ORDER)),
            map(data => data.activeOrder),
        );
    }

    setQuantity(event: { itemId: string; quantity: number; }) {
        if (0 < event.quantity) {
            this.adjustItemQuantity(event.itemId, event.quantity);
        } else {
            this.removeItem(event.itemId);
        }
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
