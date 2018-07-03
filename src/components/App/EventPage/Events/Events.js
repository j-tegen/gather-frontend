import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'

import EventList from './EventList/EventList'
import EventMap from './EventMap/EventMap'
import EventDialogContainer from './EventDialog/EventDialogContainer'
import CreateEvent from './CreateEvent/CreateEvent'
import Loader from '../../Loader/Loader'
import EventToolbar from './EventToolbar/EventToolbar'

import { EventsQuery } from 'models/event/queries'


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
	},
	mapContainer: {
		height: '95%',
		width: '100%',
	},
	fab: {
		position: 'absolute',
		marginBottom: '56px',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	}
})


class Events extends Component {
	state = {
		hoveredEvent: null,
		selectedEvent: null,
	}

	handleMouseEnter = (event) => {
		this.setState({ ...this.state, hoveredEvent: event })
	}

	handleMouseLeave = () => {
		this.setState({...this.state, hoveredEvent: null })
	}

	handleSelectEvent = (event) => {
		this.setState({ ...this.state, selectedEvent: event})
	}

	handleCloseEventCard = () => {
		this.setState({ ...this.state, selectedEvent: null })
	}

  	render() {

		if (this.props.data && this.props.data.loading) {
			console.log('Loading events')
			return <Loader />
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}
		const { data : { events }, classes, session, search, myCity } = this.props

    	return (
			<Grid className={classes.root} container spacing={0}>
				<Grid className={classes.column} item xs={12} md={7}>
					<Paper className={classes.paper} elevation={4}>
					<EventToolbar showFilters={this.props.showFilters} toggleShowFilters={this.props.toggleShowFilters} />
						<EventList
							events={events}
							session={session}
							hoveredEvent={this.state.hoveredEvent}
							selectedEvent={this.state.selectedEvent}
							handleSelectEvent={this.handleSelectEvent}
							handleMouseEnter={this.handleMouseEnter}
							handleMouseLeave={this.handleMouseLeave} />

					</Paper>
					{ session ?
						<Link to='/events/new'>
							<Button variant="fab" color="secondary" aria-label="create" className={classes.fab}>
								<AddIcon />
							</Button>
						</Link>
					: ''
					}
				</Grid>
				<Grid item xs={false} md={5}>
					<EventMap events={events}
						hoveredEvent={this.state.hoveredEvent}
						selectedEvent={this.state.selectedEvent}
						handleMouseEnter={this.handleMouseEnter}
						handleMouseLeave={this.handleMouseLeave} />
				</Grid>
				<Grid item xs={false}>
					<Switch>
						<Route
							path='/events/:id(\d+)' render={ (props) => (
									<EventDialogContainer
										selectedEvent={this.state.selectedEvent}
										{...props} />
								)
							} />
						<Route
							path='/events/new' render={(props) => (
								<CreateEvent
									{...props} />
							)
							} />
					</Switch>
				</Grid>
			</Grid>
    	)
  	}
}


export default withStyles(styles)(graphql(
    EventsQuery,
    {
        options: ({ search, myCity, first, skip }) => ( { variables: { search, first, skip }})
    }
)(Events))
