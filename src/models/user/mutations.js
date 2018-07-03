import gql from 'graphql-tag'

export const TokenAuthMutation = gql `
    mutation TokenAuthMutation($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`
