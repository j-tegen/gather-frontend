import React, { Component } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import StarIcon from '@material-ui/icons/Star'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'


import EventToolbar from './EventToolbar/EventToolbar'
import EventList from './EventList/EventList'
import EventMap from './EventMap/EventMap'
import EventDialogContainer from './EventDialog/EventDialogContainer'
import CreateEvent from './CreateEvent/CreateEvent'
import EditEventContainer from './EditEvent/EditEventContainer'
import Loader from '../../Loader/Loader'
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
		minHeight: '92vh',
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
	},
	bottomNavigation: {
		position: 'absolute',
		width: '100%',
		bottom: theme.spacing.unit * 8
	}
})


class Events extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hoveredEvent: null,
			selectedEvent: null,
			loading: false,
			showFilters: false,
			activeFilter: props.filterType,
		}
	}


	componentWillReceiveProps(newProps) {
		const { session } = newProps
		if( session !== this.props.session ) {
			this.setState({
				activeFilter: session.id ? 'NEARBY' : 'ALL',
			})
		}
	}

	handleMouseEnter = (event) => {
		this.setState({ hoveredEvent: event })
	}

	handleMouseLeave = () => {
		this.setState({ hoveredEvent: null })
	}

	handleSelectEvent = (event) => {
		this.setState({ selectedEvent: event})
		this.props.history.push(`/events/${event.id}`)
	}

	handleCloseEventCard = () => {
		this.setState({ selectedEvent: null })
		this.props.history.push('/events')
	}

	handleChangeFilter(evt, value) {
		this.setState({ activeFilter: value })
		this.props.handleChangeFilter(value)
	}

  	render() {

		if (this.props.data && this.props.data.loading) {
			return <Loader />
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}
		const { data : { events }, classes, session } = this.props

		const sortedEvents = events.concat().sort((a, b) => {
			return new Date(a.startDate) >= new Date(b.startDate) || new Date(a.startTime) >= new Date(b.startTime)
		})
    	return (
			<Grid className={classes.root} container spacing={0}>
				<Grid className={classes.column} item xs={12} md={7}>
					<Paper className={classes.paper} elevation={4}>
						<EventToolbar toggleShowSettings={this.props.toggleShowSettings} showSettings={this.props.showSettings}/>
						<EventList
							events={sortedEvents}
							session={session}
							hoveredEvent={this.state.hoveredEvent}
							selectedEvent={this.state.selectedEvent}
							handleSelectEvent={this.handleSelectEvent}
							handleMouseEnter={this.handleMouseEnter}
							handleMouseLeave={this.handleMouseLeave} />
						{ session.id &&
							<BottomNavigation
								value={this.state.activeFilter}
								onChange={this.handleChangeFilter.bind(this)}
								className={classes.bottomNavigation}
							>
								<BottomNavigationAction label="Nearby" value="NEARBY" icon={<LocationOnIcon />} />
								<BottomNavigationAction label="Responded to" value="GOING" icon={<FavoriteIcon />} />
								<BottomNavigationAction label="My events" value="MINE" icon={<StarIcon />} />
							</BottomNavigation>
						}
					</Paper>

					{ session.id &&
						<Link to='/events/new'>
							<Button variant="fab" color="secondary" aria-label="create" className={classes.fab}>
								<AddIcon />
							</Button>
						</Link>
					}
				</Grid>
				<Grid item xs={false} md={5}>
					<EventMap events={events}
						hoveredEvent={this.state.hoveredEvent}
						selectedEvent={this.state.selectedEvent}
						handleSelectEvent={this.handleSelectEvent}
						handleMouseEnter={this.handleMouseEnter}
						handleMouseLeave={this.handleMouseLeave} />
				</Grid>
				<Grid item xs={false}>
					<Switch>
						<Route
							path='/events/:id(\d+)/edit' render={ (props) => (
								<EditEventContainer handleClose={this.handleCloseEventCard.bind(this)} {...props} />
							)}
						/>
						<Route
							path='/events/:id(\d+)' render={ (props) => (
									<EventDialogContainer
										handleClose={this.handleCloseEventCard.bind(this)}
										selectedEvent={this.state.selectedEvent}
										{...props} />
								)
							} />
						<Route
							path='/events/new' render={(props) => (
								<CreateEvent
									handleClose={this.handleCloseEventCard.bind(this)}
									{...props} />
							)
							} />
					</Switch>
				</Grid>
			</Grid>
    	)
  	}
}


export default withRouter(withStyles(styles)(graphql(
    EventsQuery,
    {
        options: ({ filterType, locationId, onlyFuture, proximity, first, skip }) => ( { variables: { filterType, locationId, onlyFuture, proximity, first, skip }})
    }
)(Events)))
