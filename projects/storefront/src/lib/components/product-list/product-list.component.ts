import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetProductList } from '../../generated-types';
import { DataService } from '../../providers/data.service';

import { GET_PRODUCT_LIST } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
    // styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

    products$: Observable<GetProductList.Items[]>;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.products$ = this.dataService.query<GetProductList.Query, GetProductList.Variables>(GET_PRODUCT_LIST, {
            options: {
                take: 50,
            },
        })
            .pipe(map(data => data.products.items));
    }

}
