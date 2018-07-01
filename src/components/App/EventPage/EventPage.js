import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Events from './Events/Events'

const styles = theme => ({
    root: {
        height: '100%',
    }
});


class EventPage extends Component {
    state = {
        search: '',
        myCity: false,
        first: 10,
        skip: 0,
        showFilters: false,
    }

    toggleShowFilters() {
        this.setState({
            ...this.state,
            showFilters: !this.state.showFilters
        })
    }

    render() {
        const { first, skip } = this.state
        const { session } = this.props

        return (
            <div className={this.props.classes.root}>
                <Events
                    session={session}
                    showFilters={this.state.showFilters}
                    toggleShowFilters={this.toggleShowFilters.bind(this)}
                    search={this.state.search}
                    myCity={this.state.myCity}
                    first={first}
                    skip={skip} />
            </div>
        )
    }
}

export default withStyles(styles)(EventPage)
