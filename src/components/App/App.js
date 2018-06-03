import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import EventPage from './EventPage/EventPage'
import AppBar from './AppBar/AppBar'
import Navigation from './Navigation/Navigation'
import withTheme from 'utilities/withTheme'

const styles = (theme) => {
    return {
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            // padding: theme.spacing.unit * 3,
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
		return (
			<div className={classes.root}>
				<Navigation openMobile={false} handleDrawerToggle={() => {}} />
				<AppBar handleToggle={() => {}} />
				<main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path='/events' component={EventPage} />
                    </Switch>
				</main>
			</div>
		)
  	}
}

export default withTheme(withStyles(styles)(App))
