import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'

const styles = theme => ({
    root: {
        overflowY: 'auto',
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*10,
    },
})

class EventParticipantsTab extends Component {

    render() {
        const { classes, event, edit = false } = this.props
        if ( edit ){
            return <div>TBI</div>
        }
        return (
            <DialogContent className={classes.root}>

            </DialogContent>
        )
    }
}

export default withStyles(styles)(EventParticipantsTab)