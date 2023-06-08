import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ApolloModule } from 'apollo-angular';


import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

import { APOLLO_CLIENT_PROVIDER } from './apollo-client-provider';
import { AccountLinkComponent } from './components/account-link/account-link.component';
import { AssetGalleryComponent } from './components/asset-gallery/asset-gallery.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { CartToggleComponent } from './components/cart-toggle/cart-toggle.component';
import { CollectionBreadcrumbsComponent } from './components/collection-breadcrumbs/collection-breadcrumbs.component';
import { CollectionsMenuMobileComponent } from './components/collections-menu-mobile/collections-menu-mobile.component';
import { CollectionsMenuComponent } from './components/collections-menu/collections-menu.component';
import { LayoutFooterComponent } from './components/layout/layout-footer.component';
import { LayoutHeaderComponent } from './components/layout/layout-header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MobileMenuToggleComponent } from './components/mobile-menu-toggle/mobile-menu-toggle.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListControlsComponent } from './components/product-list-controls/product-list-controls.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchBarComponent } from './components/product-search-bar/product-search-bar.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';
import { buildIconLibrary } from './icon-library';
import { DefaultInterceptor } from './providers/data/interceptor';

const CORE_COMPONENTS = [
    ProductListComponent,
    ProductDetailComponent,
    CartToggleComponent,
    AccountLinkComponent,
    CartDrawerComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    CollectionsMenuComponent,
    CollectionsMenuMobileComponent,
    MobileMenuToggleComponent,
    ProductCardComponent,
    CollectionBreadcrumbsComponent,
    ProductListControlsComponent,
    ProductSearchBarComponent,
    AssetGalleryComponent,
];

@NgModule({
    declarations: [
        ...CORE_COMPONENTS,
        TopReviewsComponent,
    ],
    imports: [
        HttpClientModule,
        SharedModule,
        BrowserModule,
        ApolloModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: environment.baseHref },
        APOLLO_CLIENT_PROVIDER,
    ],
    exports: [
        ...CORE_COMPONENTS,
    ],
})
export class CoreModule {
    constructor(library: FaIconLibrary) {
        buildIconLibrary(library);
    }
}
