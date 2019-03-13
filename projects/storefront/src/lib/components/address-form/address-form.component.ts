import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country, ShippingAddress } from '../../generated-types';

@Component({
    selector: 'vsf-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnChanges {

    @Input() availableCountries: Country.Fragment[];
    @Input() address: ShippingAddress.Fragment;

    addressForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.addressForm = this.formBuilder.group({
            fullName: '',
            company: '',
            streetLine1: ['', Validators.required],
            streetLine2: '',
            city: ['', Validators.required],
            province: '',
            postalCode: ['', Validators.required],
            countryCode: ['', Validators.required],
            phoneNumber: '',
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('address' in changes && this.addressForm && this.address) {
            this.addressForm.patchValue(this.address, { });
        }
    }

}
