import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'vsf-account-change-password',
    templateUrl: './account-change-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountChangePasswordComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
