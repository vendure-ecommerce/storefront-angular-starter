import gql from 'graphql-tag';

import { CART_FRAGMENT } from '../../types/fragments.graphql';

export const GET_PRODUCT_DETAIL = gql`
    query GetProductDetail($id: ID!) {
        product(id: $id) {
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
                priceWithTax
                sku
            }
            featuredAsset {
                id
                name
                preview
                type
            }
            assets {
                id
                name
                preview
                type
            }
            collections {
                id
                breadcrumbs {
                    id
                    name
                }
            }
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($variantId: ID!, $qty: Int!) {
        addItemToOrder(productVariantId: $variantId, quantity: $qty) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;
