import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import ToggleButton, {ToggleButtonGroup} from '@material-ui/lab/ToggleButton'
import { withStyles } from '@material-ui/core/styles'
import MapIcon from '@material-ui/icons/Map'
import FilterListIcon from '@material-ui/icons/FilterList'

const styles = theme => ({
    mapButton: {
        position: 'absolute',
        right: theme.spacing.unit * 2,
        boxShadow: 'none',
    },
    filterButton: {
        boxShadow: 'none'
    },
    filterBadge: {
        marginTop: 5,
        marginRight: 5,
        border: '2px solid white',
        pointerEvents: 'none',
        // position: 'static',
    }
})

class EventToolbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mobileState: props.mobileShowMap ? 'map' : 'list',
            filterState: 'hidden'
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.toggleMobileShowMap) {
            const mobileState = newProps.mobileShowMap ? 'map' : 'list'
            const filterState = newProps.showSettings ? 'visible' : 'hidden'
            this.setState({ mobileState, filterState })
        }
    }
    render() {
        const { classes, toggleShowSettings, filterCount, toggleMobileShowMap } = this.props
        return (
            <Toolbar>
                <Badge classes={{badge: classes.filterBadge}} color="primary" badgeContent={filterCount}>
                    <ToggleButtonGroup value={this.state.filterState} className={classes.filterButton}>
                        <ToggleButton value='visible' onClick={toggleShowSettings}>
                            <FilterListIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Badge>
                { toggleMobileShowMap &&
                <ToggleButtonGroup value={this.state.mobileState} className={classes.mapButton}>
                    <ToggleButton value='map' onClick={toggleMobileShowMap}>
                        <MapIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                }

            </Toolbar>
        )
    }
}

export default withStyles(styles)(EventToolbar)