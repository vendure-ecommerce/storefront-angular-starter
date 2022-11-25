import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { AdjustItemQuantity, GetActiveOrder, RemoveItemFromCart } from '../../../common/generated-types';
import { DataService } from '../../providers/data/data.service';
import { NotificationService } from '../../providers/notification/notification.service';
import { StateService } from '../../providers/state/state.service';

import { ADJUST_ITEM_QUANTITY, GET_ACTIVE_ORDER, REMOVE_ITEM_FROM_CART } from './cart-drawer.graphql';

@Component({
    selector: 'vsf-cart-drawer',
    templateUrl: './cart-drawer.component.html',
    styleUrls: ['./cart-drawer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawerComponent implements OnInit {
    @Input() visible = false;
    @Output() close = new EventEmitter<void>();
    @ViewChild('overlay') private overlayRef: ElementRef<HTMLDivElement>;

    cart$: Observable<GetActiveOrder.ActiveOrder | null | undefined>;
    isEmpty$: Observable<boolean>;

    constructor(private dataService: DataService,
                private stateService: StateService,
                private notificationService: NotificationService) {}

    ngOnInit() {
        this.cart$ = merge(
            this.stateService.select(state => state.activeOrderId),
            this.stateService.select(state => state.signedIn),
        ).pipe(
            switchMap(() => this.dataService.query<GetActiveOrder.Query, GetActiveOrder.Variables>(GET_ACTIVE_ORDER, {}, 'network-only')),
            map(data => data.activeOrder),
            shareReplay(1),
        );
        this.isEmpty$ = this.cart$.pipe(
            map(cart => !cart || cart.lines.length === 0),
        );
    }

    setQuantity(event: { itemId: string; quantity: number; }) {
        if (0 < event.quantity) {
            this.adjustItemQuantity(event.itemId, event.quantity);
        } else {
            this.removeItem(event.itemId);
        }
    }

    overlayClick(event: MouseEvent) {
        if (event.target === this.overlayRef.nativeElement) {
            this.close.emit();
        }
    }

    private adjustItemQuantity(id: string, qty: number) {
        this.dataService.mutate<AdjustItemQuantity.Mutation, AdjustItemQuantity.Variables>(ADJUST_ITEM_QUANTITY, {
            id,
            qty,
        }).pipe(
            take(1),
        ).subscribe(({ adjustOrderLine }) => {
            switch (adjustOrderLine.__typename) {
                case 'Order':
                    break;
                case 'InsufficientStockError':
                case 'NegativeQuantityError':
                case 'OrderLimitError':
                case 'OrderModificationError':
                    this.notificationService.error(adjustOrderLine.message).subscribe();
                    break;
            }
        });
    }

    private removeItem(id: string) {
        this.dataService.mutate<RemoveItemFromCart.Mutation, RemoveItemFromCart.Variables>(REMOVE_ITEM_FROM_CART, {
            id,
        }).pipe(
            take(1),
        ).subscribe();
    }
}
