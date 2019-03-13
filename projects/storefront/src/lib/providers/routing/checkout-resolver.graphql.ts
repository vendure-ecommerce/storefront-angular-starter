import gql from 'graphql-tag';

import { CART_FRAGMENT, SHIPPING_ADDRESS_FRAGMENT } from '../../types/fragments.graphql';

export const GET_ORDER_FOR_CHECKOUT = gql`
    query GetOrderForCheckout {
        activeOrder {
            ...Cart
            shippingAddress {
                ...ShippingAddress
            }
        }
    }
    ${CART_FRAGMENT}
    ${SHIPPING_ADDRESS_FRAGMENT}
`;
