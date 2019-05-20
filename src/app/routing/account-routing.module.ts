import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AccountAddressBookComponent,
    AccountAddressDetailComponent,
    AccountChangeCredentialsComponent,
    AccountCustomerDetailsComponent,
    AccountDashboardComponent,
    AccountGuard,
    AccountOrderDetailComponent,
    AccountOrderListComponent,
    ChangeEmailAddressComponent,
    ForgottenPasswordComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignInGuard, StorefrontAccountModule, StorefrontSharedModule,
    VerifyComponent,
} from '@vendure/storefront';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [AccountGuard],
        component: AccountDashboardComponent,
    },
    {
        path: 'orders',
        canActivate: [AccountGuard],
        component: AccountOrderListComponent,
    },
    {
        path: 'orders/:code',
        canActivate: [AccountGuard],
        component: AccountOrderDetailComponent,
    },
    {
        path: 'address-book',
        canActivate: [AccountGuard],
        component: AccountAddressBookComponent,
    },
    {
        path: 'address-book/:id',
        canActivate: [AccountGuard],
        component: AccountAddressDetailComponent,
    },
    {
        path: 'details',
        canActivate: [AccountGuard],
        component: AccountCustomerDetailsComponent,
    },
    {
        path: 'change-credentials',
        canActivate: [AccountGuard],
        component: AccountChangeCredentialsComponent,
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        StorefrontAccountModule,
    ],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
