import { PlatformLocation } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule, Options } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { AccountLinkComponent } from './components/account-link/account-link.component';
import { AccountComponent } from './components/account/account.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { CartToggleComponent } from './components/cart-toggle/cart-toggle.component';
import { CheckoutProcessComponent } from './components/checkout-process/checkout-process.component';
import { CheckoutStageIndicatorComponent } from './components/checkout-stage-indicator/checkout-stage-indicator.component';
import { CollectionBreadcrumbsComponent } from './components/collection-breadcrumbs/collection-breadcrumbs.component';
import { CollectionsMenuComponent } from './components/collections-menu/collections-menu.component';
import { ImageZoomDirective } from './components/image-zoom/image-zoom.directive';
import { LayoutFooterComponent } from './components/layout/layout-footer.component';
import { LayoutHeaderComponent } from './components/layout/layout-header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListControlsComponent } from './components/product-list-controls/product-list-controls.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchBarComponent } from './components/product-search-bar/product-search-bar.component';
import { buildIconLibrary } from './icon-library';
import { DefaultInterceptor } from './providers/data/interceptor';
import { CustomHttpTranslationLoader } from './providers/i18n/custom-http-loader';
import { StorefrontSharedModule } from './storefront-shared.module';

const CORE_COMPONENTS = [
    ProductListComponent,
    ProductDetailComponent,
    CartToggleComponent,
    AccountLinkComponent,
    AccountComponent,
    CheckoutProcessComponent,
    CartDrawerComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    CollectionsMenuComponent,
    ProductCardComponent,
    CollectionBreadcrumbsComponent,
    ProductListControlsComponent,
    ProductSearchBarComponent,
    ImageZoomDirective,
    CheckoutStageIndicatorComponent,
];

export interface StorefrontConfig {
    apolloOptions: Options;
}

export const STORE_CONFIG = new InjectionToken('STORE_CONFIG');
export const STORE_CONFIG_ARG = new InjectionToken('STORE_CONFIG_ARG');

export function HttpLoaderFactory(http: HttpClient, location: PlatformLocation) {
    // Dynamically get the baseHref, which is configured in the angular.json file
    const baseHref = location.getBaseHrefFromDOM();
    return new CustomHttpTranslationLoader(http, baseHref + '/i18n/');
}

let apolloCache: InMemoryCache;
let providedCacheState: any | undefined;

@NgModule({
    declarations: [
        ...CORE_COMPONENTS,
    ],
    imports: [
        RouterModule.forChild([]),
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient, PlatformLocation],
            },
            compiler: { provide: TranslateCompiler, useClass: TranslateMessageFormatCompiler },
        }),
        StorefrontSharedModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    ],
    exports: [
        ...CORE_COMPONENTS,
    ],
})
export class StorefrontModule {

    static forRoot(config: StorefrontConfig | (() => StorefrontConfig)): ModuleWithProviders {
        return {
            ngModule: StorefrontModule,
            providers: [
                {
                    provide: STORE_CONFIG_ARG,
                    useValue: config,
                },
                {
                    provide: STORE_CONFIG,
                    useFactory: configFactory,
                    deps: [STORE_CONFIG_ARG],
                },
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

    extractState() {
        return apolloCache.extract();
    }

    restoreState(state: any) {
        if (apolloCache) {
            apolloCache.restore(state);
        }
        providedCacheState = state;
    }
}

export function apolloOptionsFactory(httpLink: HttpLink, config: StorefrontConfig) {
    // Note: the intermediate assignment to `fn` is required to prevent
    // an angular compiler error. See https://stackoverflow.com/a/51977115/772859
    apolloCache = new InMemoryCache();
    if (providedCacheState) {
        apolloCache.restore(providedCacheState);
    }
    const result = {
        cache: apolloCache,
        link: httpLink.create(config.apolloOptions),
    };
    return result;
}

export function configFactory(config: StorefrontConfig | (() => StorefrontConfig)) {
    return typeof config === 'function' ? config() : config;
}
