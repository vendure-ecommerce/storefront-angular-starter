import { NgModule } from '@angular/core';

import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { AccountLinkComponent } from './components/account-link/account-link.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { CartContentsComponent } from './components/cart-contents/cart-contents.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { CartToggleComponent } from './components/cart-toggle/cart-toggle.component';
import { CenteredCardComponent } from './components/centered-card/centered-card.component';
import { CheckoutConfirmationComponent } from './components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutProcessComponent } from './components/checkout-process/checkout-process.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from './components/checkout-sign-in/checkout-sign-in.component';
import { CheckoutStageIndicatorComponent } from './components/checkout-stage-indicator/checkout-stage-indicator.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { VerifyComponent } from './components/verify/verify.component';
import { MaterialModule } from './material/material.module';
import { PriceRangePipe } from './pipes/price-range.pipe';
import { StorefrontComponent } from './storefront.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    StorefrontComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartToggleComponent,
    CartContentsComponent,
    AccountLinkComponent,
    SignInComponent,
    AccountDashboardComponent,
    CheckoutProcessComponent,
    CartDrawerComponent,
    CheckoutSignInComponent,
    CheckoutShippingComponent,
    AddressFormComponent,
    CheckoutPaymentComponent,
    CheckoutStageIndicatorComponent,
    CheckoutConfirmationComponent,
    PriceRangePipe,
    RegisterComponent,
    VerifyComponent,
    CenteredCardComponent,
];

@NgModule({
    declarations: [
        COMPONENTS,
    ],
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
    ],
    exports: [
        COMPONENTS,
        MaterialModule,
    ],
})
export class StorefrontModule { }
