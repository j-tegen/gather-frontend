import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    content: {
        paddingBottom: '0px',
        color: theme.palette.secondary.main,
    },
})

class YesNoAlert extends Component {
    render() {

        const { title, description, handleYes, handleNo, open, classes } = this.props

        return (
            <Dialog
                className={classes.root}
                open={open}
                onClose={handleNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-success-title">
                    <Typography className={classes.title} variant="title" gutterBottom >
                        {title}
                    </Typography>
                    {/* <PriorityHighIcon className={classes.icon} /> */}
                </DialogTitle>
                <DialogContent className={classes.content}>

                    <DialogContentText id="alert-success-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>
                        No
                    </Button>
                    <Button onClick={handleYes} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

export default withStyles(styles)(YesNoAlert)