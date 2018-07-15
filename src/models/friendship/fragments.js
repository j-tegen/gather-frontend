import gql from 'graphql-tag'


export const friendshipFragment = gql`
    fragment friendshipFields on FriendshipType {
        id
        status
        profiles {
            id
            firstName
            lastName
        }
    }
`
