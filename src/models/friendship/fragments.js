import gql from 'graphql-tag'
import locationFragment from '../location/fragments'


export const friendshipFragment = gql`
    fragment friendshipFields on FriendshipType {
        id
        status
        profiles {
            id
            profilePicture
            firstName
            lastName
            location {
                ...locationFields
            }
        }
    }
    ${locationFragment}
`
