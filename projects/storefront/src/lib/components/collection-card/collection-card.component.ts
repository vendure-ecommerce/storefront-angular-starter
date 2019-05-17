import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { GetCollection } from '../../generated-types';

@Component({
    selector: 'vsf-collection-card',
    templateUrl: './collection-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent implements OnChanges {
    @Input() collection: GetCollection.Children;
    backgroundImageStyle: SafeStyle;
    backgroundImage: string;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges() {
        if (this.collection.featuredAsset) {
            this.backgroundImage = this.collection.featuredAsset.preview + '?w=400&h=150';
            this.backgroundImageStyle = this.sanitizer.bypassSecurityTrustStyle(
                `url("${this.backgroundImage}");`,
            );
        }
    }

}
