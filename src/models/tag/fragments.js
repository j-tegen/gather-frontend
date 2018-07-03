import gql from 'graphql-tag'

const tagFragment = gql `
    fragment tagFields on TagType {
        id
        text
    }
`
export default tagFragment
