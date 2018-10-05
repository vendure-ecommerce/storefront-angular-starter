import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../providers/data.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

    products$: Observable<any[]>;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.products$ = this.dataService.query<any>(gql`
            query {
                products {
                    items {
                        id
                        name
                        description
                        variants {
                            id
                            name
                            options {
                                code
                                name
                            }
                            price
                            sku
                        }
                        featuredAsset {
                            id
                            name
                            preview
                            type
                        }
                    }
                    totalItems
                }
            }
        `).pipe(map(data => data.products.items));
    }

}
