import gql from 'graphql-tag'
import { friendshipFragment } from './fragments'

export const AddFriendMutation = gql `
    mutation AddFriendMutation($profileId: Int!) {
        addFriend(profileId: $profileId) {
            friend {
                ...friendshipFields
            }
        }
    }
    ${friendshipFragment}
`
