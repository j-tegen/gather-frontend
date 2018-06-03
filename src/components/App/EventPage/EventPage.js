import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Events from './Events/Events'
import EventToolbar from './EventToolbar/EventToolbar'

const styles = theme => ({
    root: {
        height: '100%',
    }
});


class EventPage extends Component {
    state = {
        search: '',
        first: 10,
        skip: 0
    }

    handleSearch = (search) => {
        this.setState({
            search
        })
    }

    render() {
        const { search, first, skip } = this.state
        return (
            <div className={this.props.classes.root}>
                <Events search={search} first={first} skip={skip} />
            </div>
        )
    }
}

export default withStyles(styles)(EventPage)
