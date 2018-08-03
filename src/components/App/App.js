import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import EventPage from './EventPage/EventPage'
import ProfilePage from './ProfilePage/ProfilePage'
import AppBar from './AppBar/AppBar'
import Login from './Login/Login'
import Register from './Register/Register'
import Navigation from './Navigation/Navigation'
import withTheme from 'utilities/withTheme'
import { graphql } from 'react-apollo'

import { MeQuery } from 'models/user/queries'

const styles = (theme) => {
    return {
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
        },
        root: {
            flexGrow: 1,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100%',
        },
        toolbar: theme.mixins.toolbar,
    }
}

class App extends Component {
    state = {
        openMobile: false,
    }

    handleDrawerToggle() {
        this.setState({ openMobile: !this.state.openMobile })
    }

  	render() {
        const { classes, data: {loading, me } } = this.props
        let session = localStorage.getItem('session')
        session = session ? JSON.parse(session) : {}

        if ( loading ) {
            return <div>Loading</div>
        }
		return (
			<div className={classes.root}>
				<Navigation openMobile={this.state.openMobile} toggleMobile={this.state.openMobile} handleDrawerToggle={this.handleDrawerToggle.bind(this)} />
				<AppBar session={session} handleToggle={this.handleDrawerToggle.bind(this)} />
				<main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path='/events' render={(props) => <EventPage me={me} session={session} {...props} />} />
                        <Route path='/profile' render={(props) => <ProfilePage user={me} session={session} {...props} />} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                    </Switch>
				</main>
			</div>
		)
  	}
}

export default withTheme(withStyles(styles)(graphql(MeQuery)(App)))
