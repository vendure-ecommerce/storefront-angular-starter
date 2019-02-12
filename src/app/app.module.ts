import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
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

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
    declarations: [
        AppComponent,
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
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        MaterialModule,
        RouterModule.forRoot(routes),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    cache: InMemoryCache;

    constructor(
        apollo: Apollo,
        httpLink: HttpLink,
        private readonly transferState: TransferState,
    ) {
        this.cache = new InMemoryCache();

        apollo.create({
            link: httpLink.create({ uri: 'http://localhost:3000/api' }),
            cache: this.cache,
        });

        const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

        console.log('AppModule constructor, isBrowser:', isBrowser);
        if (isBrowser) {
            this.onBrowser();
        } else {
            this.onServer();
        }
    }

    onServer() {
        this.transferState.onSerialize(STATE_KEY, () => {
            const state = this.cache.extract();
            return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(STATE_KEY, null);
        this.cache.restore(state);
    }
}
