import gql from 'graphql-tag';

import { CART_FRAGMENT } from '../../types/fragments.graphql';

export const GET_ORDER_BY_CODE = gql`
    query GetOrderByCode($code: String!) {
        orderByCode(code: $code) {
            ...Cart
            updatedAt
        }
    }
    ${CART_FRAGMENT}
`;
