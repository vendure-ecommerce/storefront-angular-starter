import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StorefrontModule } from 'storefront';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        RouterModule.forRoot(routes),
        StorefrontModule,
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
            link: httpLink.create({ uri: 'https://demo.vendure.io/shop-api', withCredentials: true }),
            cache: this.cache,
        });

        const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

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
