import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchProducts } from '../../../common/generated-types';
import { getRouteArrayParam } from '../../../common/utils/get-route-array-param';

export interface FacetWithValues {
    id: string;
    name: string;
    values: Array<{
        id: string;
        name: string;
        count: number;
    }>;
}

@Component({
  selector: 'vsf-product-list-controls',
  templateUrl: './product-list-controls.component.html',
  styleUrls: ['./product-list-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListControlsComponent implements OnChanges {
    @Input() facetValues: SearchProducts.FacetValues[] | null;
    @Input() totalResults = 0;
    facets: FacetWithValues[];

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnChanges(changes: SimpleChanges) {
        if ('facetValues' in changes) {
            this.facets = this.groupFacetValues(this.facetValues);
        }
    }

    toggleFacetValueId(id: string): string[] {
        const existing = this.activeFacetValueIds();
        return existing.includes(id) ? existing.filter(x => x !== id) : existing.concat(id);
    }

    facetValueIsSelected(id: string): boolean {
        return this.activeFacetValueIds().includes(id);
    }

    inactiveFacetValues(values: FacetWithValues['values']): FacetWithValues['values'] {
        const activeIds = this.activeFacetValueIds();
        return values.filter(v => !activeIds.includes(v.id));
    }

    activeFacetValues(values: FacetWithValues['values']): FacetWithValues['values'] {
        const activeIds = this.activeFacetValueIds();
        return values.filter(v => activeIds.includes(v.id));
    }

    activeFacetValueIds(): string[] {
        return getRouteArrayParam(this.route.snapshot.queryParamMap, 'facets');
    }

    private groupFacetValues(facetValues: SearchProducts.FacetValues[] | null): FacetWithValues[] {
        if (!facetValues) {
            return [];
        }
        const activeFacetValueIds = this.activeFacetValueIds();
        const facetMap = new Map<string, FacetWithValues>();
        for (const { count, facetValue: { id, name, facet } } of facetValues) {
            if (count === this.totalResults && !activeFacetValueIds.includes(id)) {
                // skip FacetValues that do not ave any effect on the
                // result set and are not active
                continue;
            }
            const facetFromMap = facetMap.get(facet.id);
            if (facetFromMap) {
                facetFromMap.values.push({ id, name, count });
            } else {
                facetMap.set(facet.id, { id: facet.id, name: facet.name, values: [{ id, name, count }]});
            }
        }
        return Array.from(facetMap.values());
    }
}
