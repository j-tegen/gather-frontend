import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    errorTitle: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit*2
    },
    errorContent: {
        paddingBottom: '0px',
    },
    errorIcon: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%',
        fontSize: '80px',
        color: theme.palette.secondary.main,
    },
})

class ErrorAlert extends Component {
    render() {

        const { title, description, handleOk, open, classes } = this.props
        return (
            <Dialog
                className={classes.root}
                open={open}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-error-title">
                    <CheckCircleIcon className={classes.errorIcon} />
                </DialogTitle>
                <DialogContent className={classes.errorContent}>
                    <Typography className={classes.errorTitle} variant="title" gutterBottom >
                        {title}
                    </Typography>
                    <DialogContentText id="alert-error-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk} color="secondary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

export default withStyles(styles)(ErrorAlert)