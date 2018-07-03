import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import StarIcon from '@material-ui/icons/Star'


const deleteMutation = gql `
    mutation EventMutation($id: Int!) {
        deleteEvent(id: $id) {
            id
        }
    }
`

const createParticipantMutation = gql`
    mutation CreateParticipantMutation($id: Int!, $status: ParticipantStatus!) {
        createParticipant(idEvent: $id, status: $status) {
            participant {
                id
            }
        }
    }
`


class EventListItem extends Component {

    state = {
        anchorEl: null,
        participant: null,
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ anchorEl: null })
    }

    handleSelectEvent(event) {
        this.props.history.push(`/events/${event.id}`)
    }

    async handleDelete() {
        try {

            const response = await this.props.deleteEventMutation({

                variables: {
                    id: this.props.event.id
                }
            })
            this.handleCloseMenu()
        } catch(e) {
            console.log(e)
        }
    }

    async handleEventParticipation() {

        try {
            await this.props.createParticipantMutation({
                variables: {
                    id: this.props.event.id,
                    status: 'INTERESTED'
                }
            })
            this.handleCloseMenu()
        } catch (e) {
            console.log(e)
        }
    }

    async handleGoingToEvent() {
        try {
            const response = await this.props.createParticipantMutation({
                variables: {
                    id: this.props.event.id,
                    status: 'GOING'
                }
            })
            this.handleCloseMenu()
        } catch (e) {
            console.log(e)
        }
    }

    componentWillMount() {

        const participant = this.props.event.participants.find(participant => (
            participant.user.id === this.props.session.id
        ))
        this.setState({
            ...this.state,
            participant
        })

    }

    render() {
        const { event, session } = this.props

        const {
            title,
            startDate,
            startTime,
            minParticipants,
            maxParticipants,
            participants
        } = event

        const { anchorEl } = this.state
        const open = Boolean(anchorEl)
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
                    <IconButton aria-owns={open ? `menu-event-item-${event.id}` : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu.bind(this)}
                        color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id={`menu-event-item-${event.id}`}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleCloseMenu.bind(this)}
                    >
                        { session.id === event.organizer.id
                        ? <MenuItem onClick={this.handleDelete.bind(this)}>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Delete" />
                        </MenuItem>
                        : ''}
                        { session.id !== event.organizer.id
                        ? <MenuItem onClick={this.handleEventParticipation.bind(this)}>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="This looks interesting!" />
                        </MenuItem>
                        : '' }
                        { session.id !== event.organizer.id
                        ? <MenuItem onClick={this.handleGoingToEvent.bind(this)}>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="I'm going!" />
                        </MenuItem>
                        : '' }
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default withRouter(compose(
    graphql(deleteMutation, { name: 'deleteEventMutation' }),
    graphql(createParticipantMutation, { name: 'createParticipantMutation' }),
)(EventListItem))