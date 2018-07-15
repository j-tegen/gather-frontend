import gql from 'graphql-tag'
import locationFragment from './fragments'

export const MyLocationsQuery = gql`
    query MyLocationsQuery {
        myLocations {
            ...locationFields
        }
    }
    ${locationFragment}
`
