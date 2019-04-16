import { Route } from '@angular/router';
import {
    AccountAddressBookComponent,
    AccountAddressDetailComponent,
    AccountChangeCredentialsComponent,
    AccountComponent,
    AccountCustomerDetailsComponent,
    AccountDashboardComponent,
    AccountGuard,
    AccountOrderDetailComponent,
    AccountOrderListComponent,
    ChangeEmailAddressComponent,
    CheckoutConfirmationComponent,
    CheckoutGuard,
    CheckoutPaymentComponent,
    CheckoutProcessComponent,
    CheckoutResolver,
    CheckoutShippingComponent,
    CheckoutSignInComponent,
    ForgottenPasswordComponent,
    ProductDetailComponent,
    ProductListComponent,
    RegisterComponent,
    ResetPasswordComponent,
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
        path: 'reset-password',
        canActivate: [SignInGuard],
        component: ResetPasswordComponent,
    },
    {
        path: 'forgotten-password',
        canActivate: [SignInGuard],
        component: ForgottenPasswordComponent,
    },
    {
        path: 'change-email-address',
        canActivate: [SignInGuard],
        component: ChangeEmailAddressComponent,
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
                path: 'orders/:code',
                component: AccountOrderDetailComponent,
            },
            {
                path: 'address-book',
                component: AccountAddressBookComponent,
            },
            {
                path: 'address-book/:id',
                component: AccountAddressDetailComponent,
            },
            {
                path: 'details',
                component: AccountCustomerDetailsComponent,
            },
            {
                path: 'change-credentials',
                component: AccountChangeCredentialsComponent,
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
