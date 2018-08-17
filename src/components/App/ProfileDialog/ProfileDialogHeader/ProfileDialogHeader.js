import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import { withStyles } from '@material-ui/core/styles'
import { formatShortAddress } from 'utilities/location'


const styles = theme => ({
    profileHeader: {
        // paddingTop: theme.spacing.unit*2,
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
    },
    avatarIcon: {
        border: `${theme.spacing.unit * 2}px solid ${theme.palette.primary.main}`,
        fontSize: 218,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
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
        left: 0,
        right: 0,
        top: 0,
        height: 250,
        backgroundColor: theme.palette.primary.main,
        paddingTop: 210,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        '&.mobile': {
            right: theme.spacing.unit * 2,
        }
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
    },
    plainLink: {
        // textDecoration: 'none',
        color: '#232323',
    }
});


class ProfileCardHeader extends Component {
    render() {
        const {
            profile,
            mobile,
            classes,
        } = this.props

        const fullName = `${profile.firstName} ${profile.lastName}`
        const address = formatShortAddress(profile.location.city, profile.location.street)
        return (
            <DialogTitle className={classes.profileHeader}>
                <div className={`${classes.coloredBar} ${mobile ? 'mobile' : ''}`}>
                    { !mobile && <a href={`mailto:${profile.email}`} className={classes.infoLink}>
                        <EmailIcon />
                        <Typography className={classes.infoLink} variant="body1" gutterBottom >
                            {profile.email}
                        </Typography>
                    </a>}
                </div>
                <div className={classes.row}>
                    <div className={classes.avatar}>
                        { !profile.profilePicture &&
                            <AccountCircleIcon className={classes.avatarIcon} />
                        }
                        { profile.profilePicture &&
                            <Avatar src={profile.profilePicture} className={classes.avatarImage} />
                        }
                    </div>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.primaryText} variant="headline" gutterBottom >
                        { fullName }
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="subheading" gutterBottom >
                        <a href={`https://www.google.com/maps?q=${address}`} target="_blank" className={classes.plainLink}>{ address }</a>
                    </Typography>
                </div>
            </DialogTitle>
        )
    }
}

export default withStyles(styles)(ProfileCardHeader)
