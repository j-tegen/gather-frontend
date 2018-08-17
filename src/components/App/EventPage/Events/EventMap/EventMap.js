import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import MapMarker from './MapMarker/MapMarker'
import MeMarker from './MeMarker/MeMarker'
import { getBounds } from 'utilities/location'
import { googleMapsKey } from 'env'


const styles = () => ({
	mapContainer: {
		height: '100%',
		width: '100%',
    },
    hoveredMarked: {
        zIndex: 10,
    }
})

class EventMap extends Component {
    state = {
        height: null,
        width: null,
    }

    componentDidMount() {
        const height = document.getElementById('event-map').clientHeight
        const width = document.getElementById('event-map').clientWidth
        this.setState({
            height,
            width
        })
    }

    render () {
        const { events, classes, myLocation } = this.props

        let center = { lat: 40, lng: 8 }
        let zoom = 2

        const uniqueLocations = [myLocation,...new Set(events.map(event => event.location.googleId))]

        if (uniqueLocations.length > 1) {
            const locations = [myLocation, ...events.map(event => event.location)]
            const bounds = getBounds(locations)
            const newBounds = fitBounds(bounds, { width: this.state.width, height: this.state.height })
            center = newBounds.center
            zoom = newBounds.zoom
        } else if (!myLocation && uniqueLocations.length === 1) {
            center = {
                lat: events[0].location.latitude,
                lng: events[0].location.longitude
            }
            zoom = 13
        } else if(myLocation && uniqueLocations.length === 1) {
            center = {
                lat: myLocation.latitude,
                lng: myLocation.longitude,
            }
            zoom = 13
        }

        return (
            <div id="event-map" className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: googleMapsKey}}
                    center={center}
                    zoom={zoom}
                >
                {events.map((event) => {
                    const { location } = event
                    return (
                        <MapMarker
                            event={event}
                            className={this.props.hoveredEvent === event ? classes.hoveredMarked : ''}
                            handleSelectEvent={this.props.handleSelectEvent}
                            handleMouseEnter={this.props.handleMouseEnter}
                            handleMouseLeave={this.props.handleMouseLeave}
                            selected={this.props.selectedEvent === event}
                            hovered={this.props.hoveredEvent === event}
                            key={`${event.id}`} lat={location.latitude}
                            lng={location.longitude} text={location.title} />
                    )
                })}
                { myLocation && <MeMarker lng={myLocation.longitude} lat={myLocation.latitude} /> }
                </GoogleMapReact>
            </div>
        )
    }
}

export default withStyles(styles)(EventMap)
