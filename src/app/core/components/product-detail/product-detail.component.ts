import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AddToCart, GetProductDetail } from '../../../common/generated-types';
import { notNullOrUndefined } from '../../../common/utils/not-null-or-undefined';
import { DataService } from '../../providers/data/data.service';
import { StateService } from '../../providers/state/state.service';

import { ADD_TO_CART, GET_PRODUCT_DETAIL } from './product-detail.graphql';

@Component({
    selector: 'vsf-product-detail',
    templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.scss'],
    })
export class ProductDetailComponent implements OnInit, OnDestroy {

    product: GetProductDetail.Product;
    selectedAsset: { id: string; preview: string; };
    selectedVariant: GetProductDetail.Variants;
    qty = 1;
    breadcrumbs: GetProductDetail.Breadcrumbs[] | null = null;
    private sub: Subscription;

    constructor(private dataService: DataService,
                private stateService: StateService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        const lastCollectionId$ = this.stateService.select(state => state.lastCollectionId);
        const productSlug$ = this.route.paramMap.pipe(
            map(paramMap => paramMap.get('id')),
            filter(notNullOrUndefined),
        );

        this.sub = productSlug$.pipe(
            switchMap(slug => {
                return this.dataService.query<GetProductDetail.Query, GetProductDetail.Variables>(GET_PRODUCT_DETAIL, {
                        slug,
                    },
                );
            }),
            map(data => data.product),
            filter(notNullOrUndefined),
            withLatestFrom(lastCollectionId$),
        ).subscribe(([product, lastCollectionId]) => {
            this.product = product;
            if (this.product.featuredAsset) {
                this.selectedAsset = this.product.featuredAsset;
            }
            this.selectedVariant = product.variants[0];
            const collection = this.getMostRelevantCollection(product.collections, lastCollectionId);
            this.breadcrumbs = collection ? collection.breadcrumbs : [];
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

    /**
     * If there is a collection matching the `lastCollectionId`, return that. Otherwise return the collection
     * with the longest `breadcrumbs` array, which corresponds to the most specific collection.
     */
    private getMostRelevantCollection(collections: GetProductDetail.Collections[], lastCollectionId: string | null) {
        const lastCollection = collections.find(c => c.id === lastCollectionId);
        if (lastCollection) {
            return lastCollection;
        }
        return collections.sort((a, b) => {
            if (a.breadcrumbs.length < b.breadcrumbs.length) {
                return 1;
            }
            if (a.breadcrumbs.length > b.breadcrumbs.length) {
                return -1;
            }
            return 0;
        })[0];
    }

}
