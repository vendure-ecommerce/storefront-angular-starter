import { Route } from '@angular/router';
import {
    AccountDashboardComponent,
    AccountGuard,
    CheckoutConfirmationComponent,
    CheckoutGuard,
    CheckoutPaymentComponent,
    CheckoutProcessComponent,
    CheckoutResolver,
    CheckoutShippingComponent,
    CheckoutSignInComponent,
    ProductDetailComponent,
    ProductListComponent,
    RegisterComponent,
    SignInComponent,
    SignInGuard,
    VerifyComponent,
} from '@vendure/storefront';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalog',
    },
    {
        path: 'catalog',
        component: ProductListComponent,
        pathMatch: 'full',
    },
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
        path: 'sign-in',
        canActivate: [SignInGuard],
        component: SignInComponent,
    },
    {
        path: 'register',
        canActivate: [SignInGuard],
        component: RegisterComponent,
    },
    {
        path: 'verify',
        canActivate: [SignInGuard],
        component: VerifyComponent,
    },
    {
        path: 'account',
        canActivate: [AccountGuard],
        component: AccountDashboardComponent,
    },
    {
        path: 'checkout',
        component: CheckoutProcessComponent,
        resolve: {
            activeOrder: CheckoutResolver,
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CheckoutSignInComponent,
                canActivate: [CheckoutGuard],
            },
            {
                path: 'shipping',
                component: CheckoutShippingComponent,
                canActivate: [CheckoutGuard],
            },
            {
                path: 'payment',
                component: CheckoutPaymentComponent,
                canActivate: [CheckoutGuard],
            },
            {
                path: 'confirmation/:code',
                component: CheckoutConfirmationComponent,
                canActivate: [CheckoutGuard],
            },
        ],
    },
];
