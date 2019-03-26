import gql from 'node_modules/graphql-tag';

export const SIGN_OUT = gql`
    mutation SignOut {
        logout
    }
`;
