import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestPasswordReset } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';

import { REQUEST_PASSWORD_RESET } from './forgotten-password.graphql';

@Component({
    selector: 'vsf-forgotten-password',
    templateUrl: './forgotten-password.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ForgottenPasswordComponent {
    emailAddress = '';
    submitted = false;
    constructor(private dataService: DataService, private route: ActivatedRoute) {
        this.emailAddress = this.route.snapshot.paramMap.get('email') || '';
    }

    resetPassword() {
        this.dataService.mutate<RequestPasswordReset.Mutation, RequestPasswordReset.Variables>(REQUEST_PASSWORD_RESET, {
            emailAddress: this.emailAddress,
        }).subscribe(() => {
            this.submitted = true;
        });
    }
}
