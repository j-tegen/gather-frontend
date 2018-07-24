import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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

            </Toolbar>
        )
    }
}

export default withStyles(styles)(EventToolbar)