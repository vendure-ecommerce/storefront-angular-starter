# Vendure Storefront

This is a storefront library which is designed to be used with the [Vendure ecommerce framework](https://github.com/vendure-ecommerce/vendure) as a back end.

The app is built with the [Angular CLI](https://github.com/angular/angular-cli), with the data layer being handled by [Apollo Client](https://github.com/apollographql/apollo-client).

## Folder structure

The `@vendure/storefront` library source is located in the [`projects/storefront`](./projects/storefront) directory.

There is also an example shop app located in the [`src`](./src) directory. This is the source of the [Vendure Storefront Demo](https://demo.vendure.io/storefront/)

## Concept

The idea of this library is to provide an out-of-the box complete storefront for Angular applications. The workflow would be:

1. Start a new Angular CLI project in the usual way.
2. `npm install @vendure/storefront`
3. Consume the storefront lib in your app (see example below). The storefront lib is almost totally self-contained - it handles all data fetching and provides all the necessary UI components. The app itself (currently) just defines the app shell component, home page and the routing. Routing may somehow be provided by the lib with the option to extend.

```ts
import { StorefrontModule } from '@vendure/storefront';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        StorefrontModule.forRoot({
            apolloOptions: {
                uri: 'http://localhost:3000/shop-api',
                withCredentials: true,
            },
        }),
        StorefrontSharedModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
```

