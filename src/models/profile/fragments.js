import gql from 'graphql-tag'
import { friendshipFragment } from '../friendship/fragments'


export const profileFragment = gql`
    fragment profileFields on ProfileType {
        id
        firstName
        lastName
        friends {
            ...friendshipFields
        }
    }
    ${friendshipFragment}
`
