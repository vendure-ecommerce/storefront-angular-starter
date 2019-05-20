import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, shareReplay, switchMap, take } from 'rxjs/operators';

import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { GetOrderByCode, Register } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';
import { StateService } from '../../providers/state.service';
import { REGISTER } from '../register/register.graphql';

import { GET_ORDER_BY_CODE } from './checkout-confirmation.graphql';

@Component({
    selector: 'vsf-checkout-confirmation',
    templateUrl: './checkout-confirmation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutConfirmationComponent implements OnInit {
    registrationSent = false;
    order$: Observable<GetOrderByCode.OrderByCode>;
    notFound$: Observable<boolean>;

    constructor(private stateService: StateService,
                private dataService: DataService,
                private changeDetector: ChangeDetectorRef,
                private route: ActivatedRoute) { }

    ngOnInit() {
        const orderRequest$ = this.route.paramMap.pipe(
            map(paramMap => paramMap.get('code')),
            filter(notNullOrUndefined),
            switchMap(code => this.dataService.query<GetOrderByCode.Query, GetOrderByCode.Variables>(
                GET_ORDER_BY_CODE,
                { code },
            )),
            map(data => data.orderByCode),
            shareReplay(1),
        );
        this.order$ = orderRequest$.pipe(
            filter(notNullOrUndefined),
        );
        this.notFound$ = orderRequest$.pipe(
            map(res => !res),
        );
    }

    register() {
        this.order$.pipe(
            take(1),
            mergeMap(order => {
                const { customer } = order;
                if (customer) {
                    return this.dataService.mutate<Register.Mutation, Register.Variables>(REGISTER, {
                        input: {
                            emailAddress: customer.emailAddress,
                            firstName: customer.firstName,
                            lastName: customer.lastName,
                        },
                    });
                } else {
                    return of({});
                }
            }),
        ).subscribe(() => {
            this.registrationSent = true;
            this.changeDetector.markForCheck();
        });
    }
}
