import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'

import ProfileHeader from './ProfileHeader/ProfileHeader'
import ProfileInformation from './ProfileInformation/ProfileInformation'

import { ProfileQuery } from 'models/profile/queries'
import Loader from '../../Loader/Loader'

const styles = theme => ({
    root: {
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    grid: {
        flexGrow: 1,
        height: 'auto',
	},
	column: {
		position: 'relative',
	},
    paper: {
		height: '100%',
        minHeight: '91vh',
        margin: theme.spacing.unit,
    },
    desktopPaper: {
        '&.left': {
            marginRight: 0,
        },
        '&.right': {
            marginLeft: 0,
        },
    },
});


class Profile extends Component {
    state = {
        windowWidth: window.innerWidth,
    }

    componentDidUpdate() {
        if (this.state.windowWidth !== window.innerWidth) {
            this.setState({
                windowWidth: window.innerWidth,
            })
        }
    }

    render() {
        const {
            classes,
            data: { loading, profile },
        } = this.props

        if (loading) {
            return (
                <Loader fullscreen />
            )
        }

        if (!profile) {
            return ( <div>NOTHING HERE</div> )
        }
        const desktop = this.state.windowWidth >= 960
        return (
            <div className={classes.root}>
                <Grid className={classes.grid} container spacing={16}>
                    <Grid className={classes.column} item xs={12} md={6}>
                        <Paper className={`${classes.paper} ${desktop ? classes.desktopPaper : ''} left`} elevation={4}>
                            <ProfileHeader mobile={!desktop} profile={profile} />
                            <ProfileInformation profile={profile} />
                        </Paper>
                    </Grid>
                    {/* <Grid className={classes.column} item xs={12} md={6}>
                        <Paper className={`${classes.paper} ${desktop ? classes.desktopPaper : ''} right`} elevation={4}>
                        </Paper>
                    </Grid> */}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(graphql(ProfileQuery)(Profile))
