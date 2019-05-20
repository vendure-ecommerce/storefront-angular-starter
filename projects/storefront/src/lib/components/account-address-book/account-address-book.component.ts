import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetCustomerAddresses } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';
import { GET_CUSTOMER_ADDRESSES } from '../../types/documents.graphql';

@Component({
    selector: 'vsf-account-address-book',
    templateUrl: './account-address-book.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountAddressBookComponent implements OnInit {

    addresses$: Observable<GetCustomerAddresses.Addresses[] | null>;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.addresses$ = this.dataService.query<GetCustomerAddresses.Query>(GET_CUSTOMER_ADDRESSES).pipe(
            map(data => data.activeCustomer && data.activeCustomer.addresses),
        );
    }

}
