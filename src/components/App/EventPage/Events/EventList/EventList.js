import React from 'react'
import List from '@material-ui/core/List'
import EventListItem from './EventListItem/EventListItem'
import EventIcon from '@material-ui/icons/Event'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import EmptyState from '../../../EmptyState/EmptyState'

const styles = theme => ({
    emptyStateIcon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '160px',
        color: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        marginTop: '20vh',
    },
    emptyStateText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        textAlign: 'center',
    }
})

const EventList = (props) => {

    if (props.events.length === 0) {
        return (
            <EmptyState
                icon={<EventIcon />}
                header="No events match your search :("
                subheader="Try widen your search a little or create your own event!" />
        )
    }
    return (
        <List>

            {props.events.map(event => (
                <EventListItem
                    hovered={props.hoveredEvent === event}
                    selectedEvent={props.selectedEvent}
                    handleSelectEvent={props.handleSelectEvent}
                    handleMouseLeave={props.handleMouseLeave}
                    handleMouseEnter={props.handleMouseEnter}
                    session={props.session}
                    key={event.id}
                    event={event} />
            ))}
        </List>
    )
}

export default withStyles(styles)(EventList)
