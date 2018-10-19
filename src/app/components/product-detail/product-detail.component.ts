import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataService } from '../../providers/data.service';
import { CART_FRAGMENT } from '../../types/fragments';

@Component({
    selector: 'vsf-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    product: any;
    selectedAsset: { id: string; preview: string; };
    qty: { [variantId: string]: number };
    private sub: Subscription;

    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.paramMap.pipe(
            switchMap(paramMap => {
                return this.dataService.query<any>(gql`
                    query($id: ID!) {
                        product(id: $id) {
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
                                priceWithTax
                                sku
                            }
                            featuredAsset {
                                id
                                name
                                preview
                                type
                            }
                            assets {
                                id
                                name
                                preview
                                type
                            }
                        }
                    }`, {
                        id: paramMap.get('id'),
                    },
                );
            }),
        ).subscribe(data => {
            this.product = data.product;
            this.selectedAsset = this.product.featuredAsset;
            this.qty = this.product.variants.reduce((qty, v) => {
                return { ...qty, [v.id]: 1 };
            }, {});
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    addToCart(variant, qty: number) {
        this.dataService.mutate(gql`
            mutation ($variantId: ID!, $qty: Int!) {
                addItemToOrder(productVariantId: $variantId, quantity: $qty) {
                    ...Cart
                }
            }
            ${CART_FRAGMENT}
        `, {
            variantId: variant.id,
            qty,
        }).subscribe((data) => {
            console.log(data);
        });
    }

}
