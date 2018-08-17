import gql from 'graphql-tag'
import { friendshipFragment } from './fragments'

export const AddFriendshipMutation = gql `
    mutation AddFriendMutation($profileId: Int!) {
        addFriend(profileId: $profileId) {
            friendship {
                ...friendshipFields
            }
        }
    }
    ${friendshipFragment}
`

export const HandleFriendRequestMutation = gql`
    mutation HandleFriendRequestMutation($friendshipId: Int!, $status: FriendStatus!) {
        handleFriendRequest(friendshipId: $friendshipId, status: $status) {
            friendship {
                ...friendshipFields
            }
        }
    }
    ${friendshipFragment}
`