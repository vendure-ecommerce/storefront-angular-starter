import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'vsf-account-order-list',
    templateUrl: './account-order-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountOrderListComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
