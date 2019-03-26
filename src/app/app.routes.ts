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

import { AccountOrderListComponent } from '../../projects/storefront/src/lib/components/account-order-list/account-order-list.component';
import { AccountComponent } from '../../projects/storefront/src/lib/components/account/account.component';
import { AccountCustomerDetailsComponent } from '../../projects/storefront/src/lib/components/account-customer-details/account-customer-details.component';
import { AccountChangePasswordComponent } from '../../projects/storefront/src/lib/components/account-change-password/account-change-password.component';
import { AccountAddressBookComponent } from '../../projects/storefront/src/lib/components/account-address-book/account-address-book.component';

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
        component: AccountComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AccountDashboardComponent,
            },
            {
                path: 'orders',
                component: AccountOrderListComponent,
            },
            {
                path: 'address-book',
                component: AccountAddressBookComponent,
            },
            {
                path: 'details',
                component: AccountCustomerDetailsComponent,
            },
            {
                path: 'change-password',
                component: AccountChangePasswordComponent,
            },
        ],
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
