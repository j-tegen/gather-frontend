import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import MapIcon from '@material-ui/icons/Map'

const styles = theme => ({
    toolbar: {
        zIndex: 0,
        boxShadow: '0px 2px 4px - 1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    },
    mapButton: {
        position: 'absolute',
        right: theme.spacing.unit*2
    }
})

class EventToolbar extends Component {

    render() {
        return (
            <Toolbar className={this.props.classes.toolbar}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={this.props.toggleShowSettings}
                            checked={this.props.showSettings}
                        />
                    }
                    label="Show event settings"
                />
                <IconButton className={this.props.classes.mapButton}>
                    <MapIcon />
                </IconButton>

            </Toolbar>
        )
    }
}

export default withStyles(styles)(EventToolbar)