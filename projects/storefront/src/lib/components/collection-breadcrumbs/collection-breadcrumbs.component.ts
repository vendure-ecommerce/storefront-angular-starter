import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GetCollection } from '../../generated-types';

@Component({
    selector: 'vsf-collection-breadcrumbs',
    templateUrl: './collection-breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionBreadcrumbsComponent {

    @Input() breadcrumbs: GetCollection.Breadcrumbs[] = [];
    @Input() linkLast = false;

    tail<T>(arr: T[] | null): T[] {
        return arr ? arr.slice(1) : [];
    }
}
