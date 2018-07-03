import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import EventPage from './EventPage/EventPage'
import AppBar from './AppBar/AppBar'
import LoginDialog from './LoginDialog/LoginDialog'
import Navigation from './Navigation/Navigation'
import withTheme from 'utilities/withTheme'


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

  	render() {
        const { classes } = this.props
        let session = localStorage.getItem('session')
        session = session ? JSON.parse(session) : {}
		return (
			<div className={classes.root}>
				<Navigation openMobile={false} handleDrawerToggle={() => {}} />
				<AppBar session={session} handleToggle={() => {}} />
				<main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path='/events' render={(props) => <EventPage session={session} {...props} />} />
                        <Route path='/login' component={LoginDialog} />
                    </Switch>
				</main>
			</div>
		)
  	}
}

export default withTheme(withStyles(styles)(App))
