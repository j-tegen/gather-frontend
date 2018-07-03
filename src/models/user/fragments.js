import gql from 'graphql-tag'

export const userFragment = gql `
    fragment userFields on UserType {
        id
        username
    }
`

export const profileFragment = gql`
    fragment profileFields on ProfileType {
        id
        firstName
        lastName
    }
`
