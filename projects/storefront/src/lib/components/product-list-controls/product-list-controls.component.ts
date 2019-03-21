import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from 'node_modules/@angular/router';
import { SearchProducts } from 'projects/storefront/src/lib/generated-types';

import { getRouteArrayParam } from '../../common/utils/get-route-array-param';

export interface FacetWithValues {
    id: string;
    name: string;
    values: Array<{
        id: string;
        name: string;
    }>;
}

@Component({
  selector: 'vsf-product-list-controls',
  templateUrl: './product-list-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListControlsComponent implements OnChanges {
    @Input() facetValues: SearchProducts.FacetValues[] | null;
    facets: FacetWithValues[];

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnChanges(changes: SimpleChanges) {
        if ('facetValues' in changes) {
            this.facets = this.groupFacetValues(this.facetValues);
        }
    }

    toggleFacetValueId(id: string): string[] {
        const existing = getRouteArrayParam(this.route.snapshot.paramMap, 'facets');
        return existing.includes(id) ? existing.filter(x => x !== id) : existing.concat(id);
    }

    facetValueIsSelected(id: string): boolean {
        const existing = getRouteArrayParam(this.route.snapshot.paramMap, 'facets');
        return existing.includes(id);
    }

    private groupFacetValues(facetValues: SearchProducts.FacetValues[] | null): FacetWithValues[] {
        if (!facetValues) {
            return [];
        }
        const facetMap = new Map<string, FacetWithValues>();
        for (const { id, name, facet } of facetValues) {
            const facetFromMap = facetMap.get(facet.id);
            if (facetFromMap) {
                facetFromMap.values.push({ id, name });
            } else {
                facetMap.set(facet.id, { id: facet.id, name: facet.name, values: [{ id, name }]});
            }
        }
        return Array.from(facetMap.values());
    }
}
