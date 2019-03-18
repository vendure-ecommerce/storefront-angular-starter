import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule, Options } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
import { LayoutComponent } from './components/layout/layout.component';

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

export interface StorefrontConfig {
    apolloOptions: Options;
}

@NgModule({
    declarations: [
        COMPONENTS,
        LayoutComponent,
    ],
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
    ],
    exports: [
        COMPONENTS,
        MaterialModule,
        LayoutComponent,
    ],
})
export class StorefrontModule {

    static forRoot(config: StorefrontConfig): ModuleWithProviders {
        return {
            ngModule: StorefrontModule,
            providers: [
                {
                    provide: APOLLO_OPTIONS,
                    useFactory: apolloOptionsFactory(config.apolloOptions),
                    deps: [HttpLink],
                },
            ],
        };
    }
}

export function apolloOptionsFactory(options: Options) {
    // Note: the intermediate assignment to `fn` is required to prevent
    // an angular compiler error. See https://stackoverflow.com/a/51977115/772859
    const fn = (httpLink: HttpLink) => {
        return {
            cache: new InMemoryCache(),
            link: httpLink.create(options),
        };
    };
    return fn;
}
