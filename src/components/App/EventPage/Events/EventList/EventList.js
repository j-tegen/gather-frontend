import React from 'react'
import List from '@material-ui/core/List'
import EventListItem from './EventListItem/EventListItem'

const EventList = (props) => {

    if (props.events.length === 0) {
        return (
            <div>No events :(</div>
        )
    }
    return (
        <List>
            {props.events.map(event => (
                <EventListItem
                    hoveredEvent={props.hoveredEvent}
                    selectedEvent={props.selectedEvent}
                    handleSelectEvent={props.handleSelectEvent}
                    handleMouseLeave={props.handleMouseLeave}
                    handleMouseEnter={props.handleMouseEnter}
                    key={event.id}
                    event={event} />
            ))}
        </List>
    )
}

export default EventList
