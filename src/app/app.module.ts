import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
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
import { CheckoutConfirmationComponent } from './components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutProcessComponent } from './components/checkout-process/checkout-process.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from './components/checkout-sign-in/checkout-sign-in.component';
import { CheckoutStageIndicatorComponent } from './components/checkout-stage-indicator/checkout-stage-indicator.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MaterialModule } from './material/material.module';

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
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        MaterialModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory(httpLink: HttpLink) {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: 'http://localhost:3000/api',
                        withCredentials: true,
                    }),
                };
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
