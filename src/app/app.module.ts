import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AccountLinkComponent } from './components/account-link/account-link.component';
import { CartContentsComponent } from './components/cart-contents/cart-contents.component';
import { CartToggleComponent } from './components/cart-toggle/cart-toggle.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MaterialModule } from './material/material.module';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';

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
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
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
