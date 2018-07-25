import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import Dialog from '@material-ui/core/Dialog'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import EventDialogTitle from './EventDialogTitle/EventDialogTitle'
import EventInfoTab from './EventInfoTab/EventInfoTab'
import EventFeedTab from './EventFeedTab/EventFeedTab'
import EventParticipantsTab from './EventParticipantsTab/EventParticipantsTab'
import EventInfoBar from './EventInfoBar/EventInfoBar'
import Loader from '../../../Loader/Loader'

import { EventQuery } from 'models/event/queries'


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

    render() {
        const { data, classes } = this.props
        const { tabIndex } = this.state
        const { event } = data
        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        if (this.props.data && this.props.data.loading) {
            return (
                <Dialog classes={{ paper: dialogPaper }} fullWidth maxWidth={'md'} fullScreen={this.props.fullScreen} open onClose={this.props.handleClose}>
                    <Loader />
                </Dialog>
            )
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}



        return (
            <Dialog classes={{ paper: dialogPaper}} fullWidth maxWidth={'md'} fullScreen={this.props.fullScreen} open onClose={this.props.handleClose}>
                <EventDialogTitle event={event} fullScreen={this.props.fullScreen} handleClose={this.props.handleClose} />
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