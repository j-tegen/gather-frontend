import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'


const styles = theme => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        height: '200px',
    },
    dialogTitleText: {
        color: 'white',
    },
    headerContainer: {
        marginTop: '40px',
        textAlign: 'center',
    },
    closeButton: {
        color: 'white',
        position: 'absolute',
        top: theme.spacing.unit,
        right: theme.spacing.unit,
    }
})

class EventDialogTitle extends Component {
    render() {
        const { event, classes } = this.props
        return (
            <DialogTitle className={classes.dialogTitle}>
                <IconButton className={classes.closeButton} onClick={this.props.handleClose}>
                    <CloseIcon />
                </IconButton>
                <div className={classes.headerContainer}>
                    <Typography className={classes.dialogTitleText} variant="display1" gutterBottom >
                        {event.title}
                    </Typography>
                    <Typography className={classes.dialogTitleText} variant="subheading" gutterBottom >
                        {event.location.city}
                    </Typography>
                </div>
            </DialogTitle>
        )
    }
}

export default withStyles(styles)(EventDialogTitle)