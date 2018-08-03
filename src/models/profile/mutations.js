import gql from 'graphql-tag'
import { profileFragment } from './fragments'

export const ProfilePictureMutation = gql`
    mutation ProfilePictureMutation($profileId: Int!, $file: Upload!, $crop: CropInput!) {
        profilePicture(profileId: $profileId, file: $file, crop: $crop) {
            profile {
                ...profileFields
            }
        }
    }
    ${profileFragment}
`

export const UpdateProfileMutation = gql`
    mutation UpdateProfileMutation($profileData: ProfileInput!) {
        updateProfile(profileData: $profileData) {
            profile {
                ...profileFields
            }
        }
    }
    ${profileFragment}
`