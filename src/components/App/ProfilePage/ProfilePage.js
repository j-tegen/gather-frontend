import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'
import { formatShortAddress } from 'utilities/location'
import ImageUpload from '../ImageUpload/ImageUpload'

const styles = theme => ({
    root: {
        flexGrow: 1,
		height: '100%',
	},
	column: {
		position: 'relative',
	},
    paper: {
		height: '100%',
		minHeight: '92vh',
    },
    profileHeader: {
        paddingTop: theme.spacing.unit*2,
        minHeight: '200px',
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
        width: '140px',
        height: '140px',
        cursor: 'pointer',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    }
});


class ProfilePage extends Component {
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
            classes,
            session,
            profile,
        } = this.props

        const initials = [profile.firstName, profile.lastName].map(name => name.substring(0,1))
        const fullName = `${profile.firstName} ${profile.lastName}`
        const address = formatShortAddress(profile.location.city, profile.location.street)
        return (
            <Grid className={classes.root} container spacing={16}>
				<Grid className={classes.column} item xs={12} md={6}>
                    <Paper className={classes.paper} elevation={4}>
                        <div className={classes.profileHeader}>
                            <div className={classes.row}>
                                <IconButton onClick={this.handleOpenImageUpload.bind(this)} className={classes.avatar}>
                                    <AccountCircleIcon className={classes.avatarImage} />
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
                        </div>
                        <Divider />
                    </Paper>
                </Grid>
                <Grid className={classes.column} item xs={12} md={6}>
                    <Paper className={classes.paper} elevation={4}>
                    </Paper>
                </Grid>
                <ImageUpload
                    open={this.state.imageUploadOpen}
                    title="Upload profile picture"
                    handleOk={() => alert('!')}
                    handleCancel={this.handleCloseImageUpload.bind(this)}
                />
            </Grid>
        )
    }
}

export default withStyles(styles)(ProfilePage)
