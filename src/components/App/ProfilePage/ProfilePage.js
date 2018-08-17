import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Profile from './Profile/Profile'

const styles = theme => ({
    root: {
        width: '100%',
    }
})

const ProfilePage = (props) => {

    return (
        <Profile className={props.classes.root} id={props.match.params.id} {...props} />
    )
}

export default withStyles(styles)(ProfilePage)