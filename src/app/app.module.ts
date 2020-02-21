import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', initialNavigation: 'enabled'}),
        CoreModule,
        SharedModule,
        ServiceWorkerModule.register('/storefront/ngsw-worker.js', {enabled: environment.production, registrationStrategy: 'registerWithDelay:5000'}),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(
        private coreModule: CoreModule,
        private readonly transferState: TransferState,
    ) {
        const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

        if (isBrowser) {
            this.onBrowser();
        } else {
            this.onServer();
        }
    }

    onServer() {
        this.transferState.onSerialize(STATE_KEY, () => {
            const state = this.coreModule.extractState();
            return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(STATE_KEY, null);
        this.coreModule.restoreState(state);
    }
}
