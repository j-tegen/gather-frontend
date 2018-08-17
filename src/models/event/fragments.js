import gql from 'graphql-tag'
import locationFragment from '../location/fragments'
import participantFragment from '../participant/fragments'
import postFragment from '../post/fragments'
import tagFragment from '../tag/fragments'
import { profileFragment } from '../profile/fragments'
import { userFragment } from '../user/fragments'

export const eventsFragment = gql `
    fragment eventsFields on EventType {
        id
        title
        description
        startDate
        startTime
        endDate
        endTime
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
            user {
                ...userFields
            }
        }
    }
    ${locationFragment}
    ${userFragment}
    ${profileFragment}
    ${participantFragment}
`

export const eventFragment = gql`
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
            user {
                ...userFields
                profile {
                    ...profileFields
                }
            }
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

