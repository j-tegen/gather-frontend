import gql from 'graphql-tag'
import { friendshipFragment } from './fragments'

export const MyFriends = gql `
    query MyFriendsQuery {
        myFriends {
            ...friendshipFields
        }
    }
    ${friendshipFragment}
`