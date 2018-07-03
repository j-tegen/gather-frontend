import gql from 'graphql-tag'
import participantFragment from './fragments'

export const CreateParticipantMutation = gql `
    mutation CreateParticipantMutation($id: Int!, $status: ParticipantStatus!) {
        createParticipant(idEvent: $id, status: $status) {
            participant {
                ...participantFields
            }
        }
    }
    ${participantFragment}
`