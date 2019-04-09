import gql from 'graphql-tag';

import { ADDRESS_FRAGMENT, COUNTRY_FRAGMENT } from './fragments.graphql';

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        activeCustomer {
            id
            addresses {
                ...Address
            }
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const GET_AVAILABLE_COUNTRIES = gql`
    query GetAvailableCountries {
        availableCountries {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
