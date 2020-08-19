export const environment = {
    production: true,
    apiHost: process.env.STOREFRONT_API_HOST || 'http://localhost',
    apiPort: process.env.STOREFRONT_API_PORT || 3000,
    shopApiPath: 'shop-api',
    baseHref: '/',
};
