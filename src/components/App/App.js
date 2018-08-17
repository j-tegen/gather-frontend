import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import EventPage from './EventPage/EventPage'
import HomePage from './HomePage/HomePage'
import ProfilePage from './ProfilePage/ProfilePage'
import AppBar from './AppBar/AppBar'
import Login from './Login/Login'
import Register from './Register/Register'
import Navigation from './Navigation/Navigation'
import withTheme from 'utilities/withTheme'
import { graphql } from 'react-apollo'

import { MeQuery } from 'models/user/queries'
import Loader from './Loader/Loader'

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
        toolbar: {
            ...theme.mixins.toolbar,
        },
    }
}

class App extends Component {
    state = {
        openMobile: false,
        myLocation: null,
        width: null,
        height: null,
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                this.setState({
                    myLocation: {
                        latitude,
                        longitude
                    }
                })
            })
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('resize', this.updateDimensions.bind(this))
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    handleCloseDrawer() {
        this.setState({ openMobile: false })
    }

    handleToggleDrawer() {
        this.setState({ openMobile: !this.state.openMobile })
    }

  	render() {
        const { classes, data: {loading, me } } = this.props
        let session = localStorage.getItem('session')
        session = session ? JSON.parse(session) : {}

        if ( loading ) {
            return <Loader fullscreen />
        }
		return (
			<div className={classes.root}>
				<Navigation openMobile={this.state.openMobile} toggleMobile={this.state.openMobile} handleCloseDrawer={this.handleCloseDrawer.bind(this)} />
				<AppBar session={session} handleToggle={this.handleToggleDrawer.bind(this)} />
				<main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path='/' exact render={(props) => <HomePage user={me} session={session} {...props} />} />
                        <Route path='/events' render={(props) => <EventPage me={me} session={session} myLocation={this.state.myLocation} {...props} />} />
                        <Route path='/profile/:id(\d+)' render={ (props) => (
								<ProfilePage {...props} />
							)}
						/>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                    </Switch>
				</main>
			</div>
		)
  	}
}

export default withTheme(withStyles(styles)(graphql(MeQuery)(App)))
