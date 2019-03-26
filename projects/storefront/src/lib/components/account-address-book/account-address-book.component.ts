import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'vsf-account-address-book',
    templateUrl: './account-address-book.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountAddressBookComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
