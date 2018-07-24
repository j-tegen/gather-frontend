import gql from 'graphql-tag'
import eventFragment from './fragments'

export const CreateEventMutation = gql `
    mutation CreateEventMutation($eventData: EventInput!, $locationData: LocationInput!) {
        createEvent(eventData: $eventData, locationData: $locationData) {
            event {
                ...eventFields
            }
        }
    }
    ${eventFragment}
`

export const UpdateEventMutation = gql `
    mutation UpdateEventMutation($eventData: EventInput!, $locationData: LocationInput!) {
        updateEvent(eventData: $eventData, locationData: $locationData) {
            event {
                ...eventFields
            }
        }
    }
    ${eventFragment}
`

export const DeleteEventMutation = gql `
    mutation DeleteEventMutation($id: Int!) {
        deleteEvent(id: $id) {
            id
        }
    }
`
