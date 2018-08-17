import React, { Component } from 'react'
import debounce from 'debounce'

import FriendshipSearchBar from './FriendshipSearchBar/FriendshipSearchBar'


class FriendshipSearch extends Component {
    state = {
        search: '',
        first: 10,
        skip: 0,
    }

    constructor(props) {
        super(props)
        const ON_CHANGE_DEBOUNCE = 500
        this.handleSearch = debounce(this.handleSearch, ON_CHANGE_DEBOUNCE)
    }

    handleSearch(value) {
        this.setState({ search: value })
    }

    render() {
        return (
            <FriendshipSearchBar profile={this.props.profile} search={this.state.search} handleSearch={this.handleSearch.bind(this)} />
        )
    }
}


export default FriendshipSearch