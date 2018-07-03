import gql from 'graphql-tag'
import eventFragment from './fragments'

export const EventsQuery = gql`
    query EventsQuery($search: String!, $first: Int, $skip: Int) {
        events(search: $search, first: $first, skip: $skip) {
            ...eventFields
        }
    }
    ${eventFragment}
`
export const EventQuery = gql`
	query EventQuery($id: Int!) {
		event(id: $id) {
			...eventFields
		}
    }
    ${eventFragment}
`
