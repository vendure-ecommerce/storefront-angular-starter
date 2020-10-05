import {gql} from 'apollo-angular';


import { CART_FRAGMENT, ERROR_RESULT_FRAGMENT } from '../../../common/graphql/fragments.graphql';

export const ADD_PAYMENT = gql`
    mutation AddPayment($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
