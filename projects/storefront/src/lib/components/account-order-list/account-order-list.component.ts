import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GET_ORDER_LIST } from '../../components/account-order-list/account-order-list.graphql';
import { GetOrderList, SortOrder } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';

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
