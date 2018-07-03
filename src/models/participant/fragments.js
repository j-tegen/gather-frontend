import gql from 'graphql-tag'

const participantFragment = gql `
    fragment participantFields on ParticipantType {
        id
        status
    }
`

export default participantFragment