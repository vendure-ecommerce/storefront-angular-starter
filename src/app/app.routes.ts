import { Route } from '@angular/router';

import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AccountGuard } from './providers/routing/account.guard';
import { SignInGuard } from './providers/routing/sign-in.guard';

export const routes: Route[] = [
    {
        path: '',
        component: ProductListComponent,
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        canActivate: [SignInGuard],
        component: SignInComponent,
    },
    {
        path: 'account',
        canActivate: [AccountGuard],
        component: AccountDashboardComponent,
    },
    {
        path: ':id',
        component: ProductDetailComponent,
    },
];
