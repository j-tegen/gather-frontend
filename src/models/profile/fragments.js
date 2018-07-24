import gql from 'graphql-tag'
import { friendshipFragment } from '../friendship/fragments'
import locationFragment from '../location/fragments'


export const profileFragment = gql`
    fragment profileFields on ProfileType {
        id
        firstName
        lastName
        friends {
            ...friendshipFields
        }
        location {
            ...locationFields
        }
    }
    ${friendshipFragment}
    ${locationFragment}
`
