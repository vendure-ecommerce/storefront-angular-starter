import {gql} from 'apollo-angular';


export const GET_CART_TOTALS = gql`
    query GetCartTotals {
        activeOrder {
            id
            active
            lines {
                id
                quantity
            }
            total
        }
    }
`;
