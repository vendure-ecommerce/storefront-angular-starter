import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AddToCart, GetProductDetail } from '../../../../codegen/generated-types';
import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { DataService } from '../../providers/data.service';
import { CART_FRAGMENT } from '../../types/fragments.graphql';

import { ADD_TO_CART, GET_PRODUCT_DETAIL } from './product-detail.graphql';

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
            map(paramMap => paramMap.get('id')),
            filter(notNullOrUndefined),
            switchMap(id => {
                return this.dataService.query<GetProductDetail.Query, GetProductDetail.Variables>(GET_PRODUCT_DETAIL, {
                        id,
                    },
                );
            }),
        ).subscribe(data => {
            this.product = data.product;
            this.selectedAsset = this.product.featuredAsset;
            this.qty = this.product.variants.reduce((qty, v) => {
                return { ...qty, [v.id]: 1 };
            }, {} as { [id: string]: number; });
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    addToCart(variant, qty: number) {
        this.dataService.mutate<AddToCart.Mutation, AddToCart.Variables>(ADD_TO_CART, {
            variantId: variant.id,
            qty,
        }).subscribe((data) => {
            console.log(data);
        });
    }

}
