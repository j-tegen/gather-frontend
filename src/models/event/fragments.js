import gql from 'graphql-tag'
import locationFragment from '../location/fragments'
import participantFragment from '../participant/fragments'
import postFragment from '../post/fragments'
import tagFragment from '../tag/fragments'
import { userFragment, profileFragment } from '../user/fragments'


const eventfragment = gql`
    fragment eventFields on EventType {
        id
        title
        description
        startDate
        startTime
        endDate
        endTime
        eventType
        minParticipants
        maxParticipants
        location {
            ...locationFields
        }
        organizer {
            ...userFields
            profile {
                ...profileFields
            }
        }
        participants {
            ...participantFields
        }
        posts {
            ...postFields
            user {
                ...userFields
            }
        }
        tags {
            ...tagFields
        }
    }
    ${locationFragment}
    ${userFragment}
    ${profileFragment}
    ${participantFragment}
    ${postFragment}
    ${tagFragment}
`

export default eventfragment