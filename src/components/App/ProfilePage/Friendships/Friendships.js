import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FaceIcon from '@material-ui/icons/Face'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import YesNoAlert from '../../YesNoAlert/YesNoAlert'
import EmptyState from '../../EmptyState/EmptyState'

const styles = theme => ({
    emptyStateIcon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '160px',
        color: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        marginTop: '20vh',
    },
    emptyStateText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        textAlign: 'center',
    },
    coloredAvatar: {
        backgroundColor: theme.palette.primary.main,
    }
})

const emptyStates = [
    <EmptyState
        header="You have no friends :("
        subheader="Try to send out a few friend requests!"
        icon={<FaceIcon />}/>,
    <EmptyState
        header="Nothing here..."
        subheader="Try to send out a few friend requests!"
        icon={<FaceIcon />}/>,
    <EmptyState
        header="Phew..."
        subheader="No blocked relations!"
        icon={<FaceIcon />}/>
]

class Friendships extends Component {
    state = {
        tabIndex: 0,
        showAcceptFriend: false,
    }
    handleTabChange = (_, tabIndex) => {
        this.setState({ tabIndex })
    }

    handleClickFriend(id) {
        switch(this.state.tabIndex) {
            case 0:
            case 1:
                this.handleOpenAcceptFriendDialog()
                break
            case 2:
        }
    }

    handleAcceptFriend() {
        this.handleCloseAcceptFriendDialog()
    }

    handleRejectFriend() {
        this.handleCloseAcceptFriendDialog()
    }

    handleOpenAcceptFriendDialog() {
        this.setState({ showAcceptFriend: true })
    }

    handleCloseAcceptFriendDialog() {
        this.setState({ showAcceptFriend: false })
    }
  	render() {
        const { profile, classes } = this.props
        const { tabIndex } = this.state

        if ( profile.friends.length === 0) {
            return (
                <EmptyState
                    header="You have no friends :("
                    subheader="Try to send out a few friend requests!"
                    icon={<FaceIcon />} />
            )
        }

        const friends = profile.friends.filter(item => item.status === 'FRIENDS')
        const pending = profile.friends.filter(item => item.status === 'PENDING')
        const blocked = profile.friends.filter(item => item.status === 'BLOCKED')

		return (
			<div className={classes.root}>
                <Tabs centered fullWidth indicatorColor="secondary" value={tabIndex} onChange={this.handleTabChange}>
                    <Tab label={`Friends (${friends.length})`} />
                    <Tab label={`Pending (${pending.length})`} />
                    <Tab label={`Blocked (${blocked.length})`} />
                </Tabs>
                <YesNoAlert
                    title="Accept friend request?"
                    // description=""
                    open={this.state.showAcceptFriend}
                    handleYes={this.handleAcceptFriend.bind(this)}
                    handleNo={this.handleRejectFriend.bind(this)}
                    handleCancel={this.handleCloseAcceptFriendDialog.bind(this)}
                />
                { tabIndex === 0 && this.renderList(profile, friends, classes)}
                { tabIndex === 1 && this.renderList(profile, pending, classes)}
                { tabIndex === 2 && this.renderList(profile, blocked, classes)}
			</div>
		)
      }

      renderList(profile, listItems, classes) {
            return (
                <List>
                    { listItems.length === 0 &&
                        emptyStates[this.state.tabIndex]
                    }
                    {   listItems.length > 0 &&
                        listItems.map(friend => {
                            const friendProfile = friend.profiles.filter(item => item.id != profile.id)[0]
                            return (
                                <ListItem button key={friend.id} onClick={() => this.handleClickFriend(friend.id)}>
                                    { friendProfile.profilePicture
                                        ? <Avatar src={friendProfile.profilePicture}></Avatar>
                                        : <Avatar className={classes.coloredAvatar}>{friendProfile.firstName[0]}{friendProfile.lastName[0]}</Avatar>
                                    }
                                    <ListItemText primary={`${friendProfile.firstName} ${friendProfile.lastName}`} />
                                    <Chip label={friend.status} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            )
      }
}

export default withStyles(styles)(Friendships)
