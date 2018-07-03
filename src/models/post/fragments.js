import gql from 'graphql-tag'

const postFragment = gql `
    fragment postFields on PostType {
        id
        title
        body
    }
`

export default postFragment