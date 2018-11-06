import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { GetOrderByCode } from '../../../../codegen/generated-types';
import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { GET_ORDER_BY_CODE } from './checkout-confirmation.graphql';

@Component({
    selector: 'vsf-checkout-confirmation',
    templateUrl: './checkout-confirmation.component.html',
    styleUrls: ['./checkout-confirmation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutConfirmationComponent implements OnInit {

    order$: Observable<GetOrderByCode.OrderByCode>;

    constructor(private stateService: StateService,
                private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.order$ = this.route.paramMap.pipe(
            map(paramMap => paramMap.get('code')),
            filter(notNullOrUndefined),
            switchMap(code => this.dataService.query<GetOrderByCode.Query, GetOrderByCode.Variables>(
                GET_ORDER_BY_CODE,
                { code },
            )),
            map(data => data.orderByCode),
            filter(notNullOrUndefined),
        );
    }
}
