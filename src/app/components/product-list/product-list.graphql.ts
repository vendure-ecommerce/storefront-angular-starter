import gql from 'graphql-tag';

export const GET_PRODUCT_LIST = gql`
    query GetProductList {
        products {
            items {
                id
                name
                description
                variants {
                    id
                    name
                    options {
                        code
                        name
                    }
                    price
                    sku
                }
                featuredAsset {
                    id
                    name
                    preview
                    type
                }
            }
            totalItems
        }
    }
`;
