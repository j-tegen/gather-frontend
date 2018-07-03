import gql from 'graphql-tag'
import { userFragment, profileFragment } from './fragments'

export const MeQuery = gql `
    query MeQuery {
        me {
            ...userFields
            profile {
                ...profileFields
            }

        }
    }
    ${userFragment}
    ${profileFragment}
`