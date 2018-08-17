import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FaceIcon from '@material-ui/icons/Face'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import BlockIcon from '@material-ui/icons/Block'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { withRouter } from 'react-router-dom'

import EmptyState from '../../EmptyState/EmptyState'
import { HandleFriendRequestMutation } from 'models/friendship/mutations'
import ProfileDialog from '../../ProfileDialog/ProfileDialog'

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
    },
    listChip: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        marginRight: theme.spacing.unit * 3,
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
        anchorEl: null,
    }

    handleTabChange = (_, tabIndex) => {
        this.setState({ tabIndex })
    }

    handleOpenMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ anchorEl: null })
    }

    async handleAnswerFriendRequest(id, status) {
        try {
            await this.props.HandleFriendRequestMutation({
                variables: {
                    friendshipId: id,
                    status,
                },
            })
        } catch(e) {
            console.log(e)
        }
        this.handleCloseMenu()
    }

    handleNavigateProfile(id) {
        this.props.history.push(`/profile/${id}`)
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
                { tabIndex === 0 && this.renderList(profile, friends, classes)}
                { tabIndex === 1 && this.renderList(profile, pending, classes)}
                { tabIndex === 2 && this.renderList(profile, blocked, classes)}
                { this.state.profileDetails && <ProfileDialog profile={this.state.profileDetails} mobile={this.props.mobile} /> }
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
                            <ListItem button key={friend.id} onClick={() => this.handleNavigateProfile(friendProfile.id)}>
                                { friendProfile.profilePicture
                                    ? <Avatar src={friendProfile.profilePicture}></Avatar>
                                    : <Avatar className={classes.coloredAvatar}>{friendProfile.firstName[0]}{friendProfile.lastName[0]}</Avatar>
                                }
                                <ListItemText primary={`${friendProfile.firstName} ${friendProfile.lastName}`} />
                                <Chip className={classes.listChip} label={friend.status} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={this.handleOpenMenu.bind(this) }>
                                        <MoreVertIcon />
                                    </IconButton>
                                    {this.renderFriendMenu(friend.id)}
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    renderFriendMenu(id) {
        const menuLists = [
            <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleCloseMenu.bind(this)}>>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'DECLINE')}>
                    <ListItemIcon>
                        <ThumbDownIcon />
                    </ListItemIcon>
                    Unfriend user
                </MenuItem>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'DECLINE')}>
                    <ListItemIcon>
                        <BlockIcon />
                    </ListItemIcon>
                    Block user
                </MenuItem>
            </Menu>,
            <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleCloseMenu.bind(this)}>>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'FRIENDS')}>
                    <ListItemIcon>
                        <ThumbUpIcon />
                    </ListItemIcon>
                    Accept request
                </MenuItem>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'DECLINE')}>
                    <ListItemIcon>
                        <ThumbDownIcon />
                    </ListItemIcon>
                    Decline request
                </MenuItem>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'DECLINE')}>
                    <ListItemIcon>
                        <BlockIcon />
                    </ListItemIcon>
                    Block user
                </MenuItem>
            </Menu>,
            <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleCloseMenu.bind(this)}>>
                <MenuItem button onClick={() => this.handleAnswerFriendRequest(id, 'DECLINE')}>
                    <ListItemIcon>
                        <RadioButtonUncheckedIcon />
                    </ListItemIcon>
                    Unblock user
                </MenuItem>
            </Menu>,
        ]
        return (
            menuLists[this.state.tabIndex]
        )

    }
}

export default withRouter(withStyles(styles)(
    graphql( HandleFriendRequestMutation, { name: 'HandleFriendRequestMutation' })
(Friendships)))
