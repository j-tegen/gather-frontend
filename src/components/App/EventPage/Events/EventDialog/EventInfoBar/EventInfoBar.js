import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import PeopleIcon from '@material-ui/icons/People'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    chip: {
        marginLeft: theme.spacing.unit,
    },
    tagContainer: {
        position: 'absolute',
        right: theme.spacing.unit * 3,
    },
    quickInfoItem: {
        margin: theme.spacing.unit,
    },
})

class EventInfoBar extends Component {

    render() {
        const { classes, event } = this.props
        const nbrGoing = event.participants.filter(participant => participant.status === 'GOING').length
        const nbrInterested = event.participants.filter(participant => participant.status === 'INTERESTED').length
        return (
            <Toolbar>
                <Tooltip title="Number of people going">
                    <PeopleIcon />
                </Tooltip>
                <Typography className={classes.quickInfoItem} variant="subheading" >
                    {nbrGoing}
                </Typography>
                <Tooltip title="Number of people interested">
                    <PeopleOutlineIcon />
                </Tooltip>
                <Typography className={classes.quickInfoItem} variant="subheading" >
                    {nbrInterested}
                </Typography>
                <div className={classes.tagContainer}>
                    {event.tags.map((tag) => {
                        const avatar = (<Avatar><LocalOfferIcon /></Avatar>)
                        return (
                            <Chip
                                className={classes.chip}
                                key={tag.id}
                                label={tag.text}
                                avatar={avatar}
                            />
                        )
                    })}
                </div>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(EventInfoBar)
