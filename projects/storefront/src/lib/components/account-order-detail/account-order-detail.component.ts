import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'vsf-account-order-detail',
    templateUrl: './account-order-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountOrderDetailComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
