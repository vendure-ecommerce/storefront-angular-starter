import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { AddToCart, GetProductDetail } from '../../generated-types';
import { DataService } from '../../providers/data.service';
import { StateService } from '../../providers/state.service';

import { ADD_TO_CART, GET_PRODUCT_DETAIL } from './product-detail.graphql';

@Component({
    selector: 'vsf-product-detail',
    templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    product: GetProductDetail.Product;
    selectedAsset: { id: string; preview: string; };
    selectedVariant: GetProductDetail.Variants;
    qty = 1;
    private sub: Subscription;

    constructor(private dataService: DataService,
                private stateService: StateService,
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
            map(data => data.product),
            filter(notNullOrUndefined),
        ).subscribe(product => {
            this.product = product;
            if (this.product.featuredAsset) {
                this.selectedAsset = this.product.featuredAsset;
            }
            this.selectedVariant = product.variants[0];
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    addToCart(variant: GetProductDetail.Variants, qty: number) {
        this.dataService.mutate<AddToCart.Mutation, AddToCart.Variables>(ADD_TO_CART, {
            variantId: variant.id,
            qty,
        }).subscribe((data) => {
            this.stateService.setState('activeOrderId', data.addItemToOrder ? data.addItemToOrder.id : null);
        });
    }

}
