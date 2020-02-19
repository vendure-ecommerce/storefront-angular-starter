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
        loadChildren: () => import('./account-routing.module').then(m => m.AccountRoutingModule),
    },
    {
        path: 'checkout',
        component: CheckoutProcessComponent,
        resolve: {
            activeOrder: CheckoutResolver,
        },
        loadChildren: () => import('./checkout-routing.module').then(m => m.CheckoutRoutingModule),
    },
];
