import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql`
    query GetCollections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                parent {
                    id
                    name
                }
                featuredAsset {
                    id
                    preview
                }
            }
        }
    }
`;
