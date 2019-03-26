import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'vsf-account-customer-details',
    templateUrl: './account-customer-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCustomerDetailsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
