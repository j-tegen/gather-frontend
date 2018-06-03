import React, { Component } from 'react'
import debounce from 'debounce'

class EventToolbar extends Component {
    state = {
        search: ''
    }

    _handleSearch = debounce((search) => {
        this.props.handleSearch(search)
    }, 400)

    render() {
        return (
            <div>
                <input type='text' onChange={(e) => this._handleSearch(e.target.value) }/>
            </div>
        )
    }
}

export default EventToolbar