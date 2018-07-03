import gql from 'graphql-tag'

const locationFragment = gql`
    fragment locationFields on LocationType {
        id
        city
        street
        country
        longitude
        latitude
    }
`

export default locationFragment