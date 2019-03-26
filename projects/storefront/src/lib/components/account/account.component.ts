import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignOut } from '../../generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { SIGN_OUT } from './account.graphql';

@Component({
    selector: 'vsf-account',
    templateUrl: './account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {

    constructor(private dataService: DataService,
                private stateService: StateService,
                private router: Router) { }

    signOut() {
        this.dataService.mutate<SignOut.Mutation>(SIGN_OUT).subscribe({
            next: () => {
                this.stateService.setState('signedIn', false);
                this.router.navigate(['/']);
            },
        });
    }
}
