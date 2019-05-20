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
        private storefrontModule: StorefrontModule,
        private readonly transferState: TransferState,
    ) {
        library.add(faTwitter, faFacebook, faInstagram, faYoutube);
        const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

        if (isBrowser) {
            this.onBrowser();
        } else {
            this.onServer();
        }
    }

    onServer() {
        this.transferState.onSerialize(STATE_KEY, () => {
            const state = this.storefrontModule.extractState();
            return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(STATE_KEY, null);
        this.storefrontModule.restoreState(state);
    }
}
