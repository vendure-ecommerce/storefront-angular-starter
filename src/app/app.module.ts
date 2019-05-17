import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/fontawesome-free-brands';
import { library } from '@fortawesome/fontawesome-svg-core';
import { StorefrontModule } from '@vendure/storefront';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomePageComponent } from './components/home-page/home-page.component';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        StorefrontModule.forRoot({
            apolloOptions: {
                uri: 'http://localhost:3000/shop-api',
                withCredentials: true,
            },
        }),
        FontAwesomeModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(
        private readonly transferState: TransferState,
    ) {
        library.add(faTwitter, faFacebook, faInstagram, faYoutube);
    }

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
