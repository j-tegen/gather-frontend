import gql from 'graphql-tag'
import locationFragment from './fragments'


export const AddOrUpdateLocationMutation = gql`
    mutation AddOrUpdateLocationMutation($locationData: LocationInput!) {
        addOrUpdateLocation(locationData: $locationData) {
            location {
                ...locationFields
            }
        }
    }
    ${locationFragment}
`

export const UpdateProfileLocationMutation = gql`
    mutation UpdateProfileLocationMutation($profileId: Int!, $locationData: LocationInput!) {
        updateProfileLocation(profileId: $profileId, locationData: $locationData) {
            location {
                ...locationFields
            }
        }
    }
    ${locationFragment}
`