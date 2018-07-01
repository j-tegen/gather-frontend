import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    toolbar: {
        // borderBottom: '1px solid #ccc',
        zIndex: 0,
        boxShadow: '0px 2px 4px - 1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    }
}

class EventToolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFilters: props.showFilters
        }
    }

    toggleShowFilters = () => (event) => {
        this.setState({ showFilters: event.target.checked })
        this.props.toggleShowFilters()
    }

    render() {
        return (
            <Toolbar className={this.props.classes.toolbar}>
                <Checkbox
                    checked={this.state.showFilters}
                    onChange={this.toggleShowFilters('myCity')}
                    value="myCity"
                    />
            </Toolbar>
        )
    }
}

export default withStyles(styles)(EventToolbar)