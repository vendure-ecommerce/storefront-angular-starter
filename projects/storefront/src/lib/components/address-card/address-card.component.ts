import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderAddress } from 'projects/storefront/src/lib/generated-types';

import { DataService } from '../../providers/data.service';

@Component({
    selector: 'vsf-address-card',
    templateUrl: './address-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressCardComponent {
    @Input() address: OrderAddress.Fragment;
    @Input() title = '';
    foo: DataService;
}
