import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DataService } from '@vendure/storefront';
import gql from 'graphql-tag';

@Component({
    selector: 'sf-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

    collections$: Observable<any[]>;
    topSellers$: Observable<any[]>;
    topSellersLoaded$: Observable<boolean>;
    readonly placeholderProducts = Array.from({ length: 12 }).map(() => null);
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.collections$ = this.dataService.query(GET_COLLECTIONS, {
            options: {},
        }).pipe(
            map(data => data.collections.items
                .filter((collection: any) => collection.parent && collection.parent.name === '__root_collection__'),
            ),
        );

        this.topSellers$ = this.dataService.query(GET_TOP_SELLERS).pipe(
            map(data => data.search.items),
            shareReplay(1),
        );
        this.topSellersLoaded$ = this.topSellers$.pipe(
            map(items => 0 < items.length),
        );
    }

}

const GET_COLLECTIONS = gql`
    query GetCollections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                parent {
                    id
                    name
                }
                featuredAsset {
                    id
                    preview
                }
            }
        }
    }
`;

const GET_TOP_SELLERS = gql`
    query GetTopSellers {
        search(input: {
            take: 8,
            groupByProduct: true,
            sort: {
                price: ASC
            }
        }) {
            items {
                productId
                slug
                productPreview
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;
