import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { GetActiveCustomer, UpdateCustomerDetails, UpdateCustomerInput } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';
import { GET_ACTIVE_CUSTOMER } from '../../types/documents.graphql';

import { UPDATE_CUSTOMER_DETAILS } from './account-customer-details.graphql';

@Component({
    selector: 'vsf-account-customer-details',
    templateUrl: './account-customer-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCustomerDetailsComponent implements OnInit {

    form: FormGroup;
    constructor(private dataService: DataService,
                private formBuilder: FormBuilder,
                private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.dataService.query<GetActiveCustomer.Query>(GET_ACTIVE_CUSTOMER, {}, 'network-only').pipe(
            map(data => data.activeCustomer),
            filter(notNullOrUndefined),
        ).subscribe(customer => {
            this.form = this.formBuilder.group({
                firstName: customer.firstName,
                lastName: customer.lastName,
                phoneNumber: customer.phoneNumber,
            });
            this.changeDetectorRef.markForCheck();
        });
    }

    updateDetails() {
        const formValue = this.form.value;
        const input: UpdateCustomerInput = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            phoneNumber: formValue.phoneNumber,
        };
        this.dataService.mutate<UpdateCustomerDetails.Mutation, UpdateCustomerDetails.Variables>(UPDATE_CUSTOMER_DETAILS, {
            input,
        }).subscribe(() => {
            this.form.markAsPristine();
        });
    }

}
