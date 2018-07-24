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
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit*2
    },
    content: {
        paddingBottom: '0px',
    },
    icon: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%',
        fontSize: '80px',

    },
    primary: {
        color: theme.palette.primary.main,
    },
    secondary: {
        color: theme.palette.secondary.main,
    }
})

class YesNoAlert extends Component {
    render() {

        const { title, description, handleYes, handleNo,  open, , classes } = this.props

        // const iconClass =
        return (
            <Dialog
                className={classes.root}
                open={open}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-success-title">
                    <CheckCircleIcon className={classes.successIcon} />
                </DialogTitle>
                <DialogContent className={classes.successContent}>
                    <Typography className={classes.successTitle} variant="title" gutterBottom >
                        {title}
                    </Typography>
                    <DialogContentText id="alert-success-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

export default withStyles(styles)(SuccessAlert)