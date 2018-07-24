import gql from 'graphql-tag'
import {userFragment} from './fragments'

export const TokenAuthMutation = gql`
    mutation TokenAuthMutation($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`

export const RegisterMutation = gql`
    mutation RegisterMutation($username: String!, $password: String!, $email: String!, $locationData: ProfileLocationInput!, $profileData: ProfileInput!) {
        register(username: $username, password: $password, email: $email, locationData: $locationData, profileData: $profileData) {
            user {
                ...userFields
            }
        }
    }
    ${userFragment}
`