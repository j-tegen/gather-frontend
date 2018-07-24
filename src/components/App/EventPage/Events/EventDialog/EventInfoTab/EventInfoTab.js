import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import InformationBox from '../../../../InformationBox/InformationBox'
import {formatShortAddress} from 'utilities/location'

const styles = theme => ({
    root: {
        overflowY: 'auto',
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*10,
    }
})

class EventInfoTab extends Component {

    render() {
        const { classes, event } = this.props
        const {
            title = '',
            description = '',
            minParticipants = 0,
            maxParticipants = 0,
            startDate = '',
            startTime,
            endDate = '',
            endTime,
            organizer: { profile: { firstName = '', lastName = ''} },
            location: { city = '', street = '' },
        } = event

        const starts = `${startDate} ${startTime.substring(0,5)}`
        const ends = `${endDate || '-'} ${endTime ? endTime.substring(0,5) : ''}`
        const address = formatShortAddress(city, street)
        return (

            <DialogContent className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                        <InformationBox label="Title" value={title} />
                        <InformationBox label="Host" value={`${firstName} ${lastName}`} />
                        <InformationBox label="Starts" value={starts} />
                        <InformationBox label="Ends" value={ends} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InformationBox label="Location" value={address} />
                        <InformationBox label="Min participants" value={minParticipants} />
                        <InformationBox label="Max participants" value={maxParticipants} />
                    </Grid>
                </Grid>
                <InformationBox label="Description" value={description} />
            </DialogContent>

        )
    }
}

export default withStyles(styles)(EventInfoTab)