import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import DialogContent from '@material-ui/core/DialogContent'
import FaceIcon from '@material-ui/icons/Face'

import EmptyState from '../../../../EmptyState/EmptyState'

const styles = theme => ({
    root: {
        overflowY: 'auto',
    },
    desktop: {
        maxHeight: '450px',
        marginBottom: theme.spacing.unit * 4
    },
    mobile: {
        padding: 0,
    },
    subheader: {
        backgroundColor: 'white',
        borderBottom: '1px solid #E0E0E0',
    }
})


class EventParticipantsTab extends Component {

    render() {
        const { classes, participants, fullScreen } = this.props

        if (participants.length === 0) {
            return (
                <EmptyState
                    header="No one is going to this event..."
                    subheader="Would you like to go?"
                    icon={<FaceIcon />}/>
            )
        }

        const going = participants.filter(participant => participant.status === 'GOING')
        const interested = participants.filter(participant => participant.status === 'INTERESTED')
        const notGoing = participants.filter(participant => participant.status === 'NOTGOING')

        const test = [...going, ...interested, ...interested, ...going, ...going, ...going, ...interested, ...going]
        return (
            <DialogContent className={`${classes.root} ${!fullScreen ? classes.desktop : classes.mobile}`}>
                <List>
                    <ListSubheader className={classes.subheader}>Going ({going.length})</ListSubheader>
                    {
                        this.renderList(test, classes)
                    }
                    <ListSubheader className={classes.subheader}>Interested ({interested.length})</ListSubheader>
                    {
                        this.renderList(test, classes)
                    }
                    <ListSubheader className={classes.subheader}>Not going ({notGoing.length})</ListSubheader>
                    {
                        this.renderList(test, classes)
                    }
                </List>
            </DialogContent>
        )
    }

    renderList(listItems, classes) {
        if (listItems.length === 0) {
            return <ListItem><ListItemText primary="Nothing here!" /></ListItem>
        }
        return (
            <div>
                {listItems.map(participant => {
                    const profile = participant.user.profile
                    return (
                        <ListItem button key={participant.id}>
                            { profile.profilePicture
                                ? <Avatar src={profile.profilePicture}></Avatar>
                                : <Avatar className={classes.coloredAvatar}>{profile.firstName[0]}{profile.lastName[0]}</Avatar>
                            }
                            <ListItemText primary={`${profile.firstName} ${profile.lastName}`} />
                        </ListItem>
                    )
                })}
            </div>

        )
    }
}

export default withStyles(styles)(EventParticipantsTab)