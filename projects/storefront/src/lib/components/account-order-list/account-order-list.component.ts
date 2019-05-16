import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'node_modules/rxjs/internal/operators';
import { GET_ORDER_LIST } from 'projects/storefront/src/lib/components/account-order-list/account-order-list.graphql';
import { GetOrderList, SortOrder } from 'projects/storefront/src/lib/generated-types';
import { Observable } from 'rxjs';

import { DataService } from '../../providers/data.service';

@Component({
    selector: 'vsf-account-order-list',
    templateUrl: './account-order-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountOrderListComponent implements OnInit {

    orders$: Observable<GetOrderList.Items[] | null>;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.orders$ = this.dataService.query<GetOrderList.Query, GetOrderList.Variables>(GET_ORDER_LIST, {
            options: {
                filter: {
                    active: {
                        eq: false,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
            },
        }).pipe(
            map(data => data.activeCustomer && data.activeCustomer.orders.items),
        );
    }

}
