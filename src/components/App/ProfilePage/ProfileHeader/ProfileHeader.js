import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import { withStyles } from '@material-ui/core/styles'
import { formatShortAddress } from 'utilities/location'
import ImageUpload from '../../ImageUpload/ImageUpload'

const styles = theme => ({
    profileHeader: {
        paddingTop: theme.spacing.unit*2,
    },
    primaryText: {
        color: theme.palette.primary.main,
    },
    row: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        width: '250px',
        height: '250px',
        cursor: 'pointer',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        border: `${theme.spacing.unit * 2}px solid ${theme.palette.primary.main}`,
        '&:hover': {
            backgroundColor: '#EFEFEF',
        }
    },
    coloredBar: {
        position: 'absolute',
        color: 'white',
        left: theme.spacing.unit,
        right: theme.spacing.unit,
        top: 0,
        height: 250,
        backgroundColor: theme.palette.primary.main,
        paddingTop: 210,
        paddingLeft: theme.spacing.unit * 2,
    },
    infoLink: {
        color: 'white',
        '&:hover': {
            zoom: '102%',

        },
        '& svg': {
            display: 'inline-block',
            marginRight: theme.spacing.unit,
            color: 'inherit',
            verticalAlign: 'middle',
        },
        '& p': {
            display: 'inline-block',
            margin: 0,
            color: 'inherit',
            verticalAlign: 'middle',
            textDecoration: 'none',
        }
    }
});


class ProfileHeader extends Component {
    state = {
        imageUploadOpen: false
    }

    handleOpenImageUpload() {
        this.setState({ imageUploadOpen: true})
    }

    handleCloseImageUpload() {
        this.setState({ imageUploadOpen: false})
    }

    render() {
        const {
            profile,
            classes
        } = this.props

        const fullName = `${profile.firstName} ${profile.lastName}`
        const address = formatShortAddress(profile.location.city, profile.location.street)
        return (

            <div className={classes.profileHeader}>
                <div className={classes.coloredBar}>
                    <a href={`mailto:${profile.email}`} className={classes.infoLink}>
                        <EmailIcon />
                        <Typography className={classes.infoLink} variant="body1" gutterBottom >
                            {profile.email}
                        </Typography>
                    </a>
                </div>
                <div className={classes.row}>
                    <IconButton onClick={this.handleOpenImageUpload.bind(this)} className={classes.avatar}>
                        { !profile.profilePicture &&
                        <AccountCircleIcon className={classes.avatarImage} />
                        }
                        { profile.profilePicture &&
                            <Avatar src={profile.profilePicture} className={classes.avatarImage} />
                        }
                    </IconButton>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.primaryText} variant="headline" gutterBottom >
                        { fullName }
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="subheading" gutterBottom >
                        { address }
                    </Typography>
                </div>
                <ImageUpload
                    profile={profile}
                    open={this.state.imageUploadOpen}
                    title="Upload profile picture"
                    handleClose={this.handleCloseImageUpload.bind(this)}
                />
                <Divider />
            </div>
        )
    }
}

export default withStyles(styles)(ProfileHeader)
