import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import MapMarker from './MapMarker/MapMarker'
import { getBounds } from 'utilities/location'
import { googleMapsKey } from 'env'


const styles = theme => ({
	mapContainer: {
		height: '95%',
		width: '100%',
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
        const { events, classes } = this.props
        const bounds = getBounds(events.map(event => event.location))

        const {center, zoom } = fitBounds(bounds, { width: this.state.width, height: this.state.height })

        return (
            <div id="event-map" className={classes.mapContainer}>
                { zoom
                ? <GoogleMapReact
                    bootstrapURLKeys={{key: googleMapsKey}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                {events.map((event) => {
                    const { location } = event
                    return <MapMarker selected={this.props.selectedEvent === event} hovered={this.props.hoveredEvent === event} key={location.id} lat={location.latitude} lng={location.longitude} text={location.title} />
                })}
                </GoogleMapReact>
                : ''
            }
            </div>
        )
    }
}

export default withStyles(styles)(EventMap)
