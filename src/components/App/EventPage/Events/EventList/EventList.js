import React from 'react'
import List from '@material-ui/core/List'
import EventListItem from './EventListItem/EventListItem'
import EventIcon from '@material-ui/icons/Event'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    emptyStateIcon: {
        // position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '160px',
        color: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        marginTop: '20vh',
    },
    emptyStateText: {
        // position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        textAlign: 'center',
    }
})

const EventList = (props) => {

    if (props.events.length === 0) {
        return (
            <div>
                <EventIcon className={props.classes.emptyStateIcon} />
                <Typography className={props.classes.emptyStateText} variant="title" gutterBottom >
                    No events match your search :(
                </Typography>
                <Typography className={props.classes.emptyStateText} variant="body2" gutterBottom >
                    Try widen your search a little or create your own event!
                </Typography>
            </div>
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
                    session={props.session}
                    key={event.id}
                    event={event} />
            ))}
        </List>
    )
}

export default withStyles(styles)(EventList)
