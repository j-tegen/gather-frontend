import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker/MapMarker'
import { getCenterLocations } from 'utilities/location'


const styles = theme => ({
	mapContainer: {
		height: '95%',
		width: '100%',
	}
})

class EventMap extends Component {
    render () {
        const { events, classes } = this.props
        return (
            <div className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyD8RLSEh4UeUr06ww1PRJpjUH3rSphkPt4'}}
                    defaultCenter={getCenterLocations(events.map((event) => event.location))}
                    defaultZoom={14}
                >
                {events.map((event) => {
                    const { location } = event
                    return <MapMarker selected={this.props.selectedEvent === event} hovered={this.props.hoveredEvent === event} key={location.id} lat={location.latitude} lng={location.longitude} text={location.title} />
                })}
                </GoogleMapReact>
            </div>
        )
    }
}

export default withStyles(styles)(EventMap)
