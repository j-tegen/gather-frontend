import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import SearchBar from './SearchBar/SearchBar'

import { ProfilesQuery } from 'models/profile/queries'
import { MeQuery } from 'models/user/queries'
import { AddFriendMutation } from 'models/friendship/mutations'

class FriendshipSearchBar extends Component {
    handleAddFriendRequest = async (id) => {
         try {
            await this.props.AddFriendMutation({
                variables: {
                    profileId: id,
                },
                update: (store, { data: { addFriend: { friend } } }) => {

                    const { me } = store.readQuery({
                        query: MeQuery,
                    })

                    const { profile } = me
                    const user = {
                        ...me,
                        profile: {
                            ...profile,
                            friends: [...profile.friends, friend]
                        }
                    }
                    store.writeQuery({
                        query: MeQuery,
                        data: { me: user },
                    })
                }
            })
        } catch(e) {
            console.log(e)
        }
    }
    render() {
        const { handleSearch, data, profile } = this.props
        let profiles = []

        if( data.profiles ) {
            profiles = data.profiles.map(item => {
                const isFriend = item.friends.filter(friend => {
                    return profile.friends.filter(f => f.id === friend.id ).length > 0
                }).length !== 0
                return { isFriend, ...item}
            })
        }


        return (
            <SearchBar loading={data.loading} handleSearch={handleSearch} handleAdd={this.handleAddFriendRequest.bind(this)} searchHits={profiles}/>
        )
    }
}

export default compose(
    graphql(
        ProfilesQuery,
        { options: ({search, first, skip}) => ({variables: {search, first, skip}})}),
    graphql(AddFriendMutation, { name: 'AddFriendMutation' }),
)(FriendshipSearchBar)