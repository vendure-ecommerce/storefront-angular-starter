import { Route } from '@angular/router';
import {
    AccountComponent,
    CheckoutProcessComponent,
    CheckoutResolver,
    ProductDetailComponent,
    ProductListComponent,
} from '@vendure/storefront';

export const routes: Route[] = [
    {
        path: 'category/:collectionId',
        component: ProductListComponent,
        pathMatch: 'full',
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
        loadChildren: './routing/account-routing.module#AccountRoutingModule',
    },
    {
        path: 'checkout',
        component: CheckoutProcessComponent,
        resolve: {
            activeOrder: CheckoutResolver,
        },
        loadChildren: './routing/checkout-routing.module#CheckoutRoutingModule',
    },
];
