import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { SearchProducts } from '../../generated-types';
import { DataService } from '../../providers/data.service';

import { SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {

    products$: Observable<SearchProducts.Items[]>;

    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    ngOnInit() {
        const collectionId$ = this.route.paramMap.pipe(map(pm => pm.get('collectionId')));

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
