import gql from 'graphql-tag';

export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        lines {
            id
            featuredAsset {
                id
                preview
                name
            }
            unitPrice
            unitPriceWithPromotions
            unitPriceWithTax
            quantity
            totalPrice
            productVariant {
                id
                name
            }
            adjustments {
                amount
                description
                adjustmentSource
                type
            }
        }
        totalPriceBeforeTax
        totalPrice
    }
`;
