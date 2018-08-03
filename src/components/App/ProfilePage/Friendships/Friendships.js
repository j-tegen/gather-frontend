import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import FaceIcon from '@material-ui/icons/Face'

import EmptyState from '../../EmptyState/EmptyState'
import { MyFriends } from 'models/friendship/queries'

const styles = theme => ({
    emptyStateIcon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '160px',
        color: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        marginTop: '20vh',
    },
    emptyStateText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        textAlign: 'center',
    }
})

class Friendships extends Component {
  	render() {
        const { classes, data: { loading, myFriends } } = this.props

        if ( loading ) {
            return <div>Loading</div>
        }
        if ( myFriends.length === 0) {
            return (
                <EmptyState
                    header="You have no friends :("
                    subheader="Try to send out a few friend requests!"
                    icon={<FaceIcon />} />
            )
        }
		return (
			<div className={classes.root}>

			</div>
		)
  	}
}

export default withStyles(styles)(graphql(MyFriends)(Friendships))
