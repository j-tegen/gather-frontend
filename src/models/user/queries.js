import gql from 'graphql-tag'
import { userFragment } from './fragments'
import { profileFragment } from '../profile/fragments'

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