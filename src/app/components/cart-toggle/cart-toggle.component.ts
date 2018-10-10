import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../providers/data.service';
import { CART_FRAGMENT } from '../../types/fragments';

@Component({
    selector: 'vsf-cart',
    templateUrl: './cart-toggle.component.html',
    styleUrls: ['./cart-toggle.component.scss'],
})
export class CartToggleComponent implements OnInit {
    @Output() toggle = new EventEmitter<void>();
    cart$: Observable<any>;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.cart$ = this.dataService.query(gql`
            query {
                activeOrder {
                    ...Cart
                }
            }
            ${CART_FRAGMENT}
        `).pipe(map(data => data.activeOrder));
    }

}
