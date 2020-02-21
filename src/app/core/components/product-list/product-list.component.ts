import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mapTo, scan, share, shareReplay, skip, switchMap, tap } from 'rxjs/operators';

import { GetCollection, SearchProducts } from '../../../common/generated-types';
import { getRouteArrayParam } from '../../../common/utils/get-route-array-param';
import { AssetPreviewPipe } from '../../../shared/pipes/asset-preview.pipe';
import { DataService } from '../../providers/data/data.service';
import { StateService } from '../../providers/state/state.service';

import { GET_COLLECTION, SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
styleUrls: ['./product-list.component.scss'],
    })
export class ProductListComponent implements OnInit {
    products$: Observable<SearchProducts.Items[]>;
    totalResults$: Observable<number>;
    collection$: Observable<GetCollection.Collection | null>;
    facetValues$: Observable<SearchProducts.FacetValues[]>;
    searchTerm$: Observable<string>;
    displayLoadMore$: Observable<boolean>;
    loading$: Observable<boolean>;
    breadcrumbs$: Observable<Array<{id: string; name: string; }>>;
    mastheadBackground$: Observable<SafeStyle>;
    private currentPage = 0;
    private refresh = new BehaviorSubject<void>(undefined);
    readonly placeholderProducts = Array.from({ length: 12 }).map(() => null);

    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                private stateService: StateService,
                private sanitizer: DomSanitizer) { }

    ngOnInit() {
        const collectionId$ = this.route.paramMap.pipe(
            map(pm => pm.get('collectionId')),
            distinctUntilChanged(),
            map(id => {
                if (id) {
                    const parts = id.split('_');
                    return parts[parts.length - 1];
                }
            }),
            tap(collectionId => {
                this.stateService.setState('lastCollectionId', collectionId || null);
                this.currentPage = 0;
            }),
            shareReplay(1),
        );
        const facetValueIds$ = this.route.queryParamMap.pipe(
            map(pm => getRouteArrayParam(pm, 'facets')),
            distinctUntilChanged((x, y) => x.toString() === y.toString()),
            tap(() => {
                this.currentPage = 0;
            }),
            shareReplay(1),
        );
        this.searchTerm$ = this.route.queryParamMap.pipe(
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
            shareReplay(1),
        );

        const assetPreviewPipe = new AssetPreviewPipe();

        this.mastheadBackground$ = this.collection$.pipe(
            map(c => 'url(' + assetPreviewPipe.transform(c?.featuredAsset || undefined, 1000, 300) + ')'),
            map(style => this.sanitizer.bypassSecurityTrustStyle(style)),
        );

        this.breadcrumbs$ = this.collection$.pipe(
            map(collection => {
                if (collection) {
                    return collection.breadcrumbs;
                } else {
                    return [{
                        id: '',
                        name: 'Home',
                    }, {
                        id: '',
                        name: 'Search',
                    }];
                }
            }),
        );

        const triggerFetch$ = combineLatest(collectionId$, facetValueIds$, this.searchTerm$, this.refresh);
        this.loading$ = merge(
            triggerFetch$.pipe(mapTo(true)),
        );
        const queryResult$ = triggerFetch$.pipe(
            switchMap(([collectionId, facetValueIds, term]) => {
                const perPage = 24;
                return this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
                    input: {
                        term,
                        groupByProduct: true,
                        collectionId,
                        facetValueIds,
                        take: perPage,
                        skip: this.currentPage * perPage,
                    },
                });
            }),
            shareReplay(1),
        );

        this.loading$ = merge(
            triggerFetch$.pipe(mapTo(true)),
            queryResult$.pipe(mapTo(false)),
        );

        const RESET = 'RESET';
        const items$ = this.products$ = queryResult$.pipe(map(data => data.search.items));
        const reset$ = merge(collectionId$, facetValueIds$, this.searchTerm$).pipe(
            mapTo(RESET),
            skip(1),
            share(),
        );
        this.products$ = merge(items$, reset$).pipe(
            scan<SearchProducts.Items[] | string, SearchProducts.Items[]>((acc, val) => {
                if (typeof val === 'string') {
                    return [];
                } else {
                    return acc.concat(val);
                }
            }, [] as SearchProducts.Items[]),
        );
        this.totalResults$ = queryResult$.pipe(map(data => data.search.totalItems));
        this.facetValues$ = queryResult$.pipe(map(data => data.search.facetValues));
        this.displayLoadMore$ = combineLatest(this.products$, this.totalResults$).pipe(
            map(([products, totalResults]) => {
                return 0 < products.length && products.length < totalResults;
            }),
        );
    }

    loadMore() {
        this.currentPage ++;
        this.refresh.next();
    }

}
