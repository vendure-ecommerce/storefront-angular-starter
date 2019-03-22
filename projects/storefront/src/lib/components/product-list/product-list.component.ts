import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, share, shareReplay, switchMap, tap } from 'rxjs/operators';

import { getRouteArrayParam } from '../../common/utils/get-route-array-param';
import { GetCollection, SearchProducts } from '../../generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { GET_COLLECTION, SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {

    products$: Observable<SearchProducts.Items[]>;
    totalResults$: Observable<number>;
    collection$: Observable<GetCollection.Collection | null>;
    facetValues$: Observable<SearchProducts.FacetValues[]>;
    searchTerm$: Observable<string>;

    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                private stateService: StateService) { }

    ngOnInit() {
        const collectionId$ = this.route.paramMap.pipe(
            map(pm => pm.get('collectionId')),
            distinctUntilChanged(),
            tap(collectionId => this.stateService.setState('lastCollectionId', collectionId)),
            shareReplay(1),
        );
        const facetValueIds$ = this.route.paramMap.pipe(
            map(pm => getRouteArrayParam(pm, 'facets')),
            distinctUntilChanged((x, y) => x.toString() === y.toString()),
            shareReplay(1),
        );
        this.searchTerm$ = this.route.paramMap.pipe(
            map(pm => pm.get('search') || ''),
            distinctUntilChanged(),
            shareReplay(1),
        );

        this.collection$ = collectionId$.pipe(
            switchMap(collectionId => {
                if (collectionId) {
                    return this.dataService.query<GetCollection.Query, GetCollection.Variables>(GET_COLLECTION, {
                        id: collectionId,
                    }).pipe(
                        map(data => data.collection),
                    );
                } else {
                    return of(null);
                }
            }),
        );
        const queryResult$ = combineLatest(collectionId$, facetValueIds$, this.searchTerm$).pipe(
            switchMap(([collectionId, facetIds, term]) => {
                return this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
                    input: {
                        term,
                        groupByProduct: true,
                        collectionId,
                        facetIds,
                    },
                });
            }),
        );
        this.products$ = queryResult$.pipe(map(data => data.search.items));
        this.totalResults$ = queryResult$.pipe(map(data => data.search.totalItems));
        this.facetValues$ = queryResult$.pipe(map(data => data.search.facetValues));
    }

}
