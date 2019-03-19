import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchProducts } from '../../generated-types';
import { DataService } from '../../providers/data.service';

import { SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {

    products$: Observable<SearchProducts.Items[]>;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.products$ = this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
            input: {
                groupByProduct: true,
            },
        })
            .pipe(map(data => data.search.items));
    }

}
