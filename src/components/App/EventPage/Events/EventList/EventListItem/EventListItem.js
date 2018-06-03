import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'


class EventListItem extends Component {

    handleSelectEvent(event) {
        this.props.handleSelectEvent(event)
        this.props.history.push(`/events/${event.id}`)
    }

    render() {
        const { event, history } = this.props

        const {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            minParticipants,
            maxParticipants,
            participants
        } = event
        const secondaryText = `${startDate} ${startTime.substring(0,5)}`
        const nbrGoing = participants.filter(participant => participant.status === 'GOING').length
        const tooltip = `${nbrGoing} ${nbrGoing === 1 ? 'is' : 'are'} going to the event for ${minParticipants} to ${maxParticipants} participants!`
        return (
            <ListItem onClick={() => this.handleSelectEvent(event)} onMouseEnter={() => this.props.handleMouseEnter(event)} onMouseLeave={() => this.props.handleMouseLeave()} button>
                <Tooltip title={tooltip} placement="right">
                    <Avatar>{maxParticipants}</Avatar>
                </Tooltip>
                <ListItemText primary={title} secondary={secondaryText} />
                <ListItemSecondaryAction>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default withRouter(EventListItem)