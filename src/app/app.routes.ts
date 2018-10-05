import { Route } from '@angular/router';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Route[] = [
    {
        path: '',
        component: ProductListComponent,
        pathMatch: 'full',
    },
    {
        path: ':id',
        component: ProductDetailComponent,
    },
];
