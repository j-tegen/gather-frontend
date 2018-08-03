import gql from 'graphql-tag'

export const userFragment = gql `
    fragment userFields on UserType {
        id
        username
        email
    }
`
