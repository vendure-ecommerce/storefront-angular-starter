import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    CheckoutConfirmationComponent,
    CheckoutGuard,
    CheckoutPaymentComponent,
    CheckoutShippingComponent,
    CheckoutSignInComponent, StorefrontCheckoutModule,
    StorefrontSharedModule,
} from '@vendure/storefront';

const routes: Routes = [
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        StorefrontCheckoutModule,
    ],
    exports: [RouterModule],
})
export class CheckoutRoutingModule { }
