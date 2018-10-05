import gql from 'graphql-tag';

export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        items {
            id
            adjustments {
                amount
                description
            }
            featuredAsset {
                id
                preview
                name
            }
            unitPrice
            quantity
            totalPrice
            productVariant {
                id
                name
            }
        }
        totalPrice
        adjustments {
            amount
            description
        }
    }
`;
