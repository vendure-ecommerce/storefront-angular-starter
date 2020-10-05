import gql from 'graphql-tag';

import { ERROR_RESULT_FRAGMENT } from '../../../common/graphql/fragments.graphql';

export const VERIFY_CHANGE_EMAIL_ADDRESS = gql`
    mutation VerifyChangeEmailAddress($token: String!) {
        updateCustomerEmailAddress(token: $token) {
            ... on Success {
                success
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
