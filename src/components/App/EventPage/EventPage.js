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
    state = {
        proximity: 25,
        filterType: 'NEARBY',
        onlyFuture: true,
        first: 10,
        skip: 0,
        showSettings: false,
    }

    changeFilter(filterType) {
        this.setState({ filterType })
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
                    location: {
                        id: locationId = null
                    } = {}
                } = {}
            } = {}
        } = this.props



        return (
            <div className={this.props.classes.root}>
                <Events
                    session={session}
                    showSettings={showSettings}
                    toggleShowSettings={this.toggleShowSettings.bind(this)}
                    filterType={locationId ? this.state.filterType : 'ALL'}
                    locationId={locationId}
                    onlyFuture={this.state.onlyFuture}
                    proximity={this.state.proximity}
                    handleChangeFilter={this.handleChangeFilter}
                    first={first}
                    skip={skip} />
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
