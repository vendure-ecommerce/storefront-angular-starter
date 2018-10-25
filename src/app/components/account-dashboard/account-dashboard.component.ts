import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetAccountOverview, SignOut } from '../../../../codegen/generated-types';
import { DataService } from '../../providers/data.service';

import { GET_ACCOUNT_OVERVIEW, SIGN_OUT } from './account-dashboard.graphql';
import { Router } from '@angular/router';
import { StateService } from '../../providers/state.service';

@Component({
    selector: 'vsf-account-dashboard',
    templateUrl: './account-dashboard.component.html',
    styleUrls: ['./account-dashboard.component.scss'],
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
        );
    }

    signOut() {
        this.dataService.mutate<SignOut.Mutation>(SIGN_OUT).subscribe({
            next: () => {
                this.stateService.setState('signedIn', false);
                this.router.navigate(['/']);
            },
        });
    }
}
