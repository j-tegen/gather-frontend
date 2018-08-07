import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Events from './Events/Events'
import EventSettings from './EventSettings/EventSettings'

const styles = theme => ({
    root: {
        height: '100%',
    }
});



class EventPage extends Component {


    constructor(props) {
        super(props)
        const eventFilter = localStorage.getItem('eventFilter')

        const {
            proximity = 25,
            onlyFuture = true,
            first = 10,
            skip = 0,
            filterType = 'NEARBY',
        } = JSON.parse(eventFilter || '{}')

        this.state = {
            proximity,
            filterType,
            onlyFuture,
            first,
            skip,
            showSettings: false,
        }
        this.saveFilterCookie()
    }



    componentDidUpdate(newState) {
        if (this.state !== newState) {
            this.saveFilterCookie()
        }
    }

    saveFilterCookie() {
        const {
            me: {
                profile: {
                    location: {
                        id: locationId = null
                    } = {}
                } = {}
            } = {}
        } = this.props

        localStorage.setItem('eventFilter', JSON.stringify({
            filterType: this.state.filterType,
            locationId,
            proximity: this.state.proximity,
            onlyFuture: this.state.onlyFuture,
            first: this.state.first,
            skip: this.state.skip,
        }))
    }

    changeFilter(filterType) {
        this.setState({
            filterType
        })
    }

    toggleShowSettings() {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    handleSaveSettings(settings) {
        const { proximity, onlyFuture } = settings
        this.setState({
            proximity: proximity,
            onlyFuture: onlyFuture
        })
    }

    render() {
        const { first, skip, showSettings } = this.state
        const {
            session,
            me: {
                profile: {
                    location
                } = {}
            } = {},
            myLocation,
        } = this.props

        const { longitude = null, latitude = null } = (myLocation ? myLocation : location)

        return (
            <div className={this.props.classes.root}>
                <Events
                    session={session}
                    showSettings={showSettings}
                    toggleShowSettings={this.toggleShowSettings.bind(this)}
                    filterType={this.state.filterType}
                    latitude={latitude}
                    longitude={longitude}
                    onlyFuture={this.state.onlyFuture}
                    proximity={this.state.proximity}
                    handleChangeFilter={this.changeFilter.bind(this)}
                    first={first}
                    skip={skip}
                    myLocation={myLocation}
                    filterCount={this.state.filterCount} />
                <EventSettings
                    open={showSettings}
                    toggleOpen={this.toggleShowSettings.bind(this)}
                    handleSaveSettings={this.handleSaveSettings.bind(this)}
                    proximity={this.state.proximity}
                    onlyFuture={this.state.onlyFuture}
                />
            </div>
        )
    }
}

export default withStyles(styles)(EventPage)
