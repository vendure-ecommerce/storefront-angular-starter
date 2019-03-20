import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { CollectionsMenuComponent } from './components/collections-menu/collections-menu.component';
import { DropdownContentDirective } from './components/dropdown/dropdown-content.directive';
import { DropdownTriggerDirective } from './components/dropdown/dropdown-trigger.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LayoutFooterComponent } from './components/layout/layout-footer.component';
import { LayoutHeaderComponent } from './components/layout/layout-header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { VerifyComponent } from './components/verify/verify.component';
import { buildIconLibrary } from './icon-library';
import { PriceRangePipe } from './pipes/price-range.pipe';

const COMPONENTS = [
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
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    CollectionsMenuComponent,
    ProductCardComponent,
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownContentDirective,
];

export interface StorefrontConfig {
    apolloOptions: Options;
}

export const STORE_CONFIG = new InjectionToken('STORE_CONFIG');

@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        FontAwesomeModule,
        OverlayModule,
    ],
    exports: [
        ...COMPONENTS,
        ApolloModule,
    ],
})
export class StorefrontModule {

    static forRoot(config: StorefrontConfig): ModuleWithProviders {
        return {
            ngModule: StorefrontModule,
            providers: [
                { provide: STORE_CONFIG, useValue: config },
                {
                    provide: APOLLO_OPTIONS,
                    useFactory: apolloOptionsFactory,
                    deps: [HttpLink, STORE_CONFIG],
                },
            ],
        };
    }

    constructor() {
        buildIconLibrary();
    }
}

export function apolloOptionsFactory(httpLink: HttpLink, config: StorefrontConfig) {
    // Note: the intermediate assignment to `fn` is required to prevent
    // an angular compiler error. See https://stackoverflow.com/a/51977115/772859
    const result = {
        cache: new InMemoryCache(),
        link: httpLink.create(config.apolloOptions),
    };
    return result;
}
