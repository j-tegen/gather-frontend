import gql from 'graphql-tag'
import { profileFragment } from './fragments'

export const ProfilesQuery = gql`
    query ProfilesQuery($search: String!, $first: Int, $skip: Int) {
        profiles(search: $search, first: $first, skip: $skip) {
            ...profileFields
        }
    }
    ${profileFragment}
`

export const ProfileQuery = gql`
    query ProfileQuery($id: Int!) {
        profile(id: $id){
            ...profileFields
        }
    }
    ${profileFragment}
`
