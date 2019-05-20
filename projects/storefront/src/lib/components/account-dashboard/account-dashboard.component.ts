import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { GetAccountOverview, SignOut } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';
import { StateService } from '../../providers/state.service';

import { GET_ACCOUNT_OVERVIEW } from './account-dashboard.graphql';

@Component({
    selector: 'vsf-account-dashboard',
    templateUrl: './account-dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDashboardComponent implements OnInit {

    activeCustomer$: Observable<GetAccountOverview.ActiveCustomer>;
    constructor(private dataService: DataService,
                private stateService: StateService,
                private router: Router) { }

    ngOnInit() {
        this.activeCustomer$ = this.dataService.query<GetAccountOverview.Query>(GET_ACCOUNT_OVERVIEW).pipe(
            map(data => data.activeCustomer),
            filter(notNullOrUndefined),
        );
    }
}
