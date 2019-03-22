import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SearchProducts } from '../../generated-types';

@Component({
    selector: 'vsf-product-card',
    templateUrl: './product-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

    @Input() product: SearchProducts.Items;
}
