import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GetCollection, SearchProducts } from '../../generated-types';
import { DataService } from '../../providers/data.service';

import { GET_COLLECTION, SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {

    products$: Observable<SearchProducts.Items[]>;
    collection$: Observable<GetCollection.Collection | null>;

    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    ngOnInit() {
        const collectionId$ = this.route.paramMap.pipe(map(pm => pm.get('collectionId')));

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
        this.products$ = collectionId$.pipe(
            switchMap(collectionId => {
                return this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
                    input: {
                        groupByProduct: true,
                        collectionId,
                    },
                });
            }),
        )
            .pipe(map(data => data.search.items));
    }

}
