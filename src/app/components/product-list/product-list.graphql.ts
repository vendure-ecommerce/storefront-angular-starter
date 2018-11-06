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
                    priceWithTax
                }
                featuredAsset {
                    id
                    preview
                }
            }
            totalItems
        }
    }
`;
