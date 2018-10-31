import gql from 'graphql-tag';

import { CART_FRAGMENT, COUNTRY_FRAGMENT, SHIPPING_ADDRESS_FRAGMENT } from '../../types/fragments.graphql';

export const GET_AVAILABLE_COUNTRIES = gql`
    query GetAvailableCountries {
        availableCountries {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;

export const GET_SHIPPING_ADDRESS = gql`
    query GetShippingAddress {
        activeOrder {
            id
            shippingAddress {
                ...ShippingAddress
            }
        }
    }
    ${SHIPPING_ADDRESS_FRAGMENT}
`;

export const SET_SHIPPING_ADDRESS = gql`
    mutation SetShippingAddress($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
            ...Cart
            shippingAddress {
                ...ShippingAddress
            }
        }
    }
    ${CART_FRAGMENT}
    ${SHIPPING_ADDRESS_FRAGMENT}
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
    query GetEligibleShippingMethods {
        eligibleShippingMethods {
            shippingMethodId
            description
            price
        }
    }
`;

export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod($id: ID!) {
        setOrderShippingMethod(shippingMethodId: $id) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const TRANSITION_TO_ARRANGING_PAYMENT = gql`
    mutation TransitionToArrangingPayment {
        transitionOrderToState(state: "ArrangingPayment") {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;
