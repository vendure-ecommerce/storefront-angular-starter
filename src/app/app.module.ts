import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StorefrontModule } from '@vendure/storefront';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        StorefrontModule.forRoot({
            apolloOptions: {
                uri: 'https://demo.vendure.io/shop-api',
                withCredentials: true,
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(
        private readonly transferState: TransferState,
    ) {}

    onServer() {
        this.transferState.onSerialize(STATE_KEY, () => {
           // const state = this.cache.extract();
          //  return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(STATE_KEY, null);
       // this.cache.restore(state);
    }
}
