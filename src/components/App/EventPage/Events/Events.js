import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import EventList from './EventList/EventList'
import EventMap from './EventMap/EventMap'
import MapMarker from './EventMap/MapMarker/MapMarker'
import EventDialogContainer from './EventDialog/EventDialogContainer'
import Loader from '../../Loader/Loader'


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
    },
    paper: {
        height: '100%',
	},
	mapContainer: {
		height: '95%',
		width: '100%',
	}
})

const EventsQuery = gql`
	query EventsQuery($search: String!, $first: Int, $skip: Int) {
		events(search: $search, first: $first, skip: $skip) {
			id
			title
			description
			startDate
			startTime
			endDate
			endTime
			eventType
			minParticipants
			maxParticipants
			organizer {
				id
				username
				profile {
					firstName
					lastName
				}
			}
			participants {
				id
				status
			}
			location {
				id
				city
				street
				country
				longitude
				latitude
			}
			posts {
                id
				title
				body
				user {
					username
				}
			}
			tags {
				id
				text
			}
		}
	}
`


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
			return <Loader />
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
		}
        const events = this.props.data.events
		const classes = this.props.classes

    	return (
			<Grid className={classes.root} container spacing={0}>
				<Grid item xs={12} md={7}>
					<Paper className={classes.paper} elevation={4}>
						<EventList
							events={events}
							hoveredEvent={this.state.hoveredEvent}
							selectedEvent={this.state.selectedEvent}
							handleSelectEvent={this.handleSelectEvent}
							handleMouseEnter={this.handleMouseEnter}
							handleMouseLeave={this.handleMouseLeave} />
					</Paper>
				</Grid>
				<Grid item xs={false} md={5}>
					<EventMap events={events}
						hoveredEvent={this.state.hoveredEvent}
						selectedEvent={this.state.selectedEvent}
						handleMouseEnter={this.handleMouseEnter}
						handleMouseLeave={this.handleMouseLeave} />
				</Grid>
				<Switch>
					<Route
						path='/events/:id' render={ (props) => (
								<EventDialogContainer
									{...props} />
							)
						} />
				</Switch>
			</Grid>
    	)
  	}
}


export default withStyles(styles)(graphql(
    EventsQuery,
    {
        options: ({ search, first, skip }) => ( { variables: { search, first, skip }})
    }
)(Events))
