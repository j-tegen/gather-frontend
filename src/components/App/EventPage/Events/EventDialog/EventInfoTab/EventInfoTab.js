import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InformationBox from '../../../../InformationBox/InformationBox'

const styles = theme => ({
    root: {
        overflowY: 'auto',
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*10,
    }
})

class EventInfoTab extends Component {

    render() {
        const { classes, event, edit = false } = this.props
        if ( edit ){
            return (
                <div>
                    <DialogContent className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    fullWidth
                                    value={event.title}
                                    margin="normal"
                                />
                                <TextField
                                    id="minParticipants"
                                    label="Min participants"
                                    fullWidth
                                    type="number"
                                    value={event.minParticipants}
                                    margin="normal"
                                />
                                <TextField
                                    id="maxParticipants"
                                    label="Max participants"
                                    fullWidth
                                    type="number"
                                    value={event.maxParticipants}
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="city"
                                    label="City"
                                    fullWidth
                                    value={event.location.city}
                                    margin="normal"
                                />
                                <TextField
                                    id="street"
                                    label="Street"
                                    fullWidth
                                    value={event.location.street}
                                    margin="normal"
                                />
                                <TextField
                                    id="country"
                                    label="Country"
                                    fullWidth
                                    value={event.location.country}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.handleCancelEdit}>
                            Cancel
                        </Button>
                        <Button color="primary" autoFocus onClick={this.props.handleSave}>
                            Save
                        </Button>
                    </DialogActions>
                </div>
            )
        }

        const { organizer: { profile }, location } = event

        const starts = `${event.startDate} ${event.startTime.substring(0,5)}`
        const ends = `${event.endDate} ${event.endTime ? event.endTime.substring(0,5) : ''}`
        const address = `${location.street}, ${location.city}`
        return (

            <DialogContent className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                        <InformationBox label="Title" value={event.title} />
                        <InformationBox label="Host" value={`${profile.firstName} ${profile.lastName}`} />
                        <InformationBox label="Starts" value={starts} />
                        <InformationBox label="Ends" value={ends} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InformationBox label="Location" value={address} />
                        <InformationBox label="Min participants" value={event.minParticipants} />
                        <InformationBox label="Max participants" value={event.maxParticipants} />
                    </Grid>
                </Grid>
                <InformationBox label="Description" value={event.description} />
            </DialogContent>

        )
    }
}

export default withStyles(styles)(EventInfoTab)