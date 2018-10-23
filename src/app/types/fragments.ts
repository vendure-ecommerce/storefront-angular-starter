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
            items {
                id
                unitPrice
                taxRate
                unitPriceIncludesTax
                unitPriceWithTax
                adjustments {
                    amount
                    description
                    adjustmentSource
                    type
                }
            }
        }
        subTotal
        subTotalBeforeTax
        totalBeforeTax
        total
        adjustments {
            amount
            description
            adjustmentSource
            type
        }
    }
`;
