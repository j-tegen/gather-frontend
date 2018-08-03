import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileInformationForm from './ProfileInformationForm/ProfileInformationForm'
import Friendships from './Friendships/Friendships'

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
});


class ProfilePage extends Component {
    render() {
        const {
            classes,
            user,
        } = this.props
        console.log(user)
        if (!user) {
            return (
                <div>Log in to access this shit!</div>
            )
        }

        return (
            <Grid className={classes.root} container spacing={16}>
				<Grid className={classes.column} item xs={12} md={6}>
                    <Paper className={classes.paper} elevation={4}>
                        <ProfileHeader profile={user.profile} />
                        <ProfileInformationForm user={user} />
                    </Paper>
                </Grid>
                <Grid className={classes.column} item xs={12} md={6}>
                    <Paper className={classes.paper} elevation={4}>
                        <Friendships />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(ProfilePage)
