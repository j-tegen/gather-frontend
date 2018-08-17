import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

import withMobileDialog from '@material-ui/core/withMobileDialog'

import Loader from '../Loader/Loader'
import ProfileDialogHeader from './ProfileDialogHeader/ProfileDialogHeader'


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

class ProfileDialog extends Component {
    state = {
    }

    render() {
        const { mobile, profile, classes } = this.props

        const dialogPaper = this.props.mobile ? classes.dialogPaperMobile : classes.dialogPaperDesktop

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
                <ProfileDialogHeader profile={profile} mobile={mobile} />
            </Dialog>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(ProfileDialog)))