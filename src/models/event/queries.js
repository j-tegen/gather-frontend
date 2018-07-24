import gql from 'graphql-tag'
import eventFragment from './fragments'

export const EventsQuery = gql`
    query EventsQuery($filterType: String!, $onlyFuture: Boolean, $locationId: Int, $proximity: Int, $first: Int, $skip: Int) {
        events(filterType: $filterType, onlyFuture: $onlyFuture, locationId: $locationId, proximity: $proximity, first: $first, skip: $skip) {
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
