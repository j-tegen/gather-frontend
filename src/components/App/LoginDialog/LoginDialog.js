import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import withMobileDialog from '@material-ui/core/withMobileDialog'
import Loader from '../Loader/Loader'


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

class LoginDialog extends Component {

    handleClose = () => {
        this.props.history.push(this.props.location.state.fromPath)
    }

    render() {
        const { classes } = this.props

        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        return (
            <Dialog classes={{ paper: dialogPaper}} fullWidth maxWidth={'md'} fullScreen={this.props.fullScreen} open onClose={this.handleClose}>
                <div>Hej</div>
            </Dialog>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(LoginDialog)))