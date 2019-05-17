import gql from 'graphql-tag';

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                slug
                productName
                description
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productPreview
            }
            totalItems
            facetValues {
                count
                facetValue {
                    id
                    name
                    facet {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_COLLECTION = gql`
    query GetCollection($id: ID!) {
        collection(id: $id) {
            id
            name
            description
            featuredAsset {
                id
                preview
            }
            breadcrumbs {
                id
                name
            }
            children {
                id
                featuredAsset {
                    id
                    preview
                }
                name
            }
        }
    }
`;
