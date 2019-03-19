import gql from 'graphql-tag';

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                slug
                productName
                description
                price
                productPreview
            }
            totalItems
        }
    }
`;
