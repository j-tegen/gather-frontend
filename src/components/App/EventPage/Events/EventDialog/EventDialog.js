import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import withMobileDialog from '@material-ui/core/withMobileDialog'
import EventDialogTitle from './EventDialogTitle/EventDialogTitle'
import EventInfoTab from './EventInfoTab/EventInfoTab'
import EventFeedTab from './EventFeedTab/EventFeedTab'
import EventParticipantsTab from './EventParticipantsTab/EventParticipantsTab'
import EventSpeedDial from './EventSpeedDial/EventSpeedDial'
import EventInfoBar from './EventInfoBar/EventInfoBar'
import Loader from '../../../Loader/Loader'


const EventQuery = gql`
	query EventQuery($id: Int!) {
		event(id: $id) {
			id
			title
			description
			startDate
			startTime
			endDate
			endTime
			eventType
			minParticipants
			maxParticipants
			organizer {
				id
				username
				profile {
					firstName
					lastName
				}
			}
			participants {
				id
				status
			}
			location {
				id
				city
				street
				country
				longitude
				latitude
			}
			posts {
                id
				title
				body
				user {
					username
				}
			}
			tags {
				id
				text
			}
		}
	}
`


const styles = theme => ({
    dialogPaperMobile: {
        overflow: 'hidden',
    },
    dialogPaperDesktop: {
        overflow: 'hidden',
        top: '10vh',
        position: 'absolute',
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
    },
    dialogTitleText: {
        color: 'white',
    },

})

class EventDialog extends Component {
    state = {
        tabIndex: 0,
        edit: false,
        hideSpeedDial: false,
    }

    handleEdit = () => {
        this.setState({ ...this.state, edit: true, hideSpeedDial: true })
    }

    handleCancelEdit = () => {
        this.setState({ ...this.state, edit: false, hideSpeedDial: false})
    }

    handleSave = () => {
        this.setState({ ...this.state, edit: false, hideSpeedDial: false })
    }

    handleTabChange = (event, tabIndex) => {
        this.setState({ ...this.state, tabIndex })
    }

    handleClose = () => {
        this.props.history.push('/events')
    }

    render() {
        if (this.props.data && this.props.data.loading) {
			return <Loader />
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}
        const { data, open, classes } = this.props
        const { tabIndex } = this.state
        const { event } = data

        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        return (
            <Dialog classes={{ paper: dialogPaper}} fullWidth maxWidth={'md'} fullScreen={this.props.fullScreen} open onClose={this.handleClose}>
                <EventDialogTitle event={event} fullScreen={this.props.fullScreen} handleClose={this.handleClose} />
                <EventInfoBar event={event} />
                <Tabs centered fullWidth indicatorColor="secondary" value={tabIndex} onChange={this.handleTabChange}>
                    <Tab label="Info" />
                    <Tab label="Feed" />
                    <Tab label="Participants" />
                </Tabs>
                {tabIndex === 0 &&
                    <EventInfoTab
                        edit={this.state.edit}
                        event={event}
                        handleCancelEdit={this.handleCancelEdit}
                        handleSave={this.handleSave}
                    />
                }
                {tabIndex === 1 && <EventFeedTab event={event} />}
                {tabIndex === 2 && <EventParticipantsTab event={event} />}
                <EventSpeedDial hidden={this.state.hideSpeedDial} handleEdit={this.handleEdit} />
            </Dialog>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(graphql(
    EventQuery,
    {
        options: ({ id }) => ( { variables: { id }})
    }
)(EventDialog))))