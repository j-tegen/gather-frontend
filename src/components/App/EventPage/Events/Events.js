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
		height: 'calc(100vh - 64px)',
		overflowY: 'hidden',
		overflowX: 'hidden',
	},
	grid: {
		height: 'calc(100vh - 64px)',
	},
	column: {
		position: 'relative',
	},
    paper: {
		height: '100%',
	},
	mapContainer: {
		height: '100%',
		width: '100%',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2.5,
		right: theme.spacing.unit * 2,
	},
	bottomNavigation: {
		position: 'absolute',
		width: '100%',
		bottom: 0
	},
	mobileToolbar: {
		width: '100%',
	},
	mobileFooter: {
		position: 'absolute',
		bottom: 0,
		paddingRight: theme.spacing.unit * 10,
		height: 56,
	}
})


class Events extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hoveredEvent: null,
			selectedEvent: null,
			loading: false,
			showSettings: false,
			activeFilter: props.filterType,
			windowWidth: window.innerWidth,
			filterCount: this.getFilterCount(props),
			mobileShowMap: localStorage.getItem('events.mobileShowMap') === 'true',
		}
	}

	componentDidUpdate() {
		if (this.state.windowWidth !== window.innerWidth){
			this.setState({
				windowWidth: window.innerWidth,
			})
		}
	}

	getFilterCount(props) {
		let count = 0
		count += (props.onlyFuture ? 1 : 0)

		return count
	}

	componentWillReceiveProps(newProps) {
		if( newProps !== this.props ) {
			this.setState({
				filterCount: this.getFilterCount(newProps),
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

	toggleMobileShowMap() {
		localStorage.setItem('events.mobileShowMap', !this.state.mobileShowMap)
		this.setState({
			mobileShowMap: !this.state.mobileShowMap
		})
	}

  	render() {
		if (this.props.data && this.props.data.loading) {
			return <Loader fullscreen/>
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}
		const { data : { events }, classes, session } = this.props

		const desktop = this.state.windowWidth >= 960

		const sortedEvents = events.concat().sort((a, b) => {
			return new Date(a.startDate) >= new Date(b.startDate) || new Date(a.startTime) >= new Date(b.startTime)
		})

    	return (
			<div className={classes.root}>
				{  desktop &&
					this.renderDesktop(session, sortedEvents, classes)
				}
				{  !desktop &&
					this.renderMobile(session, sortedEvents, classes)
				}
			</div>
    	)
	}

	renderDesktop(session, events, classes) {
		return (
			<Grid className={classes.grid} container spacing={0}>
				<Grid className={classes.column} item md={7}>
					<Paper className={classes.paper} elevation={4}>
						<EventToolbar filterCount={this.state.filterCount} toggleShowSettings={this.props.toggleShowSettings} showSettings={this.props.showSettings}/>
						<EventList
							events={events}
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
						{ session.id && this.renderFab(classes) }
					</Paper>
				</Grid>
				<Grid item md={5}>
					<EventMap events={events}
						myLocation={this.props.myLocation}
						hoveredEvent={this.state.hoveredEvent}
						selectedEvent={this.state.selectedEvent}
						handleSelectEvent={this.handleSelectEvent}
						handleMouseEnter={this.handleMouseEnter}
						handleMouseLeave={this.handleMouseLeave} />
				</Grid>
				<div>
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
				</div>
			</Grid>
		)
	}


	renderMobile(session, events, classes) {
		return (
			<Grid className={classes.grid} container spacing={0}>
				<Grid className={classes.column} item xs={12}>
					<Paper className={classes.paper} elevation={4}>
						<EventToolbar
							filterCount={this.state.filterCount}
							showSettings={this.props.showSettings}
							toggleShowSettings={this.props.toggleShowSettings}
							mobileShowMap={this.state.mobileShowMap}
							toggleMobileShowMap={this.toggleMobileShowMap.bind(this)}/>
						{ !this.state.mobileShowMap &&
						<EventList
							events={events}
							session={session}
							hoveredEvent={this.state.hoveredEvent}
							selectedEvent={this.state.selectedEvent}
							handleSelectEvent={this.handleSelectEvent}
							handleMouseEnter={this.handleMouseEnter}
							handleMouseLeave={this.handleMouseLeave} />}
						{ this.state.mobileShowMap &&
						<EventMap events={events}
							myLocation={this.props.myLocation}
							hoveredEvent={this.state.hoveredEvent}
							selectedEvent={this.state.selectedEvent}
							handleSelectEvent={this.handleSelectEvent}
							handleMouseEnter={this.handleMouseEnter}
							handleMouseLeave={this.handleMouseLeave} />}
						{ session.id &&
							<BottomNavigation
								value={this.state.activeFilter}
								onChange={this.handleChangeFilter.bind(this)}
								className={`${classes.bottomNavigation} ${classes.mobileFooter}`}
							>
								<BottomNavigationAction label="Nearby" value="NEARBY" icon={<LocationOnIcon />} />
								<BottomNavigationAction label="Responded to" value="GOING" icon={<FavoriteIcon />} />
								<BottomNavigationAction label="My events" value="MINE" icon={<StarIcon />} />
							</BottomNavigation>
						}
						{ session.id && this.renderFab(classes) }
					</Paper>
				</Grid>
				<div>
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
				</div>
			</Grid>
		)
	}

	renderFab(classes) {
		return (

			<Link to='/events/new'>
				<Button variant="fab" color="secondary" aria-label="create" className={classes.fab}>
					<AddIcon />
				</Button>
			</Link>

		)
	}
}


export default withRouter(withStyles(styles)(graphql(
    EventsQuery,
    {
        options: ({
        	filterType,
        	longitude,
        	latitude,
        	onlyFuture,
        	proximity,
        	first,
        	skip
        }) => ({
        	variables: {
        		filterType,
        		longitude,
        		latitude,
        		onlyFuture,
        		proximity,
        		first,
        		skip
        	}
        })
    }
)(Events)))
