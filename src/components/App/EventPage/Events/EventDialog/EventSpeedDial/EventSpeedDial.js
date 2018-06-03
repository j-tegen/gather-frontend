import React, { Component } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import MessageIcon from '@material-ui/icons/Message'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
})

const actions = [
    { icon: <PersonAddIcon />, name: 'Participate' },
    { icon: <EditIcon />, name: 'Edit' },
    { icon: <MessageIcon />, name: 'Post to feed' },
    { icon: <LocalOfferIcon />, name: 'Add tag' },
]


class EventSpeedDial extends Component {
    state = {
        open: false,
    }

    handleClick = (action) => {
        switch(action.name) {
            case 'Edit':
                this.props.handleEdit()
                break;
            default:
                console.log('No action taken...')
        }
        this.setState({
            open: !this.state.open,
        })
    }

    handleOpen = () => {
        if (!this.state.hidden) {
            this.setState({
                open: true,
            })
        }
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        const { classes, hidden = false } = this.props
        const { open } = this.state

        return (

            <SpeedDial
                hidden={hidden}
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onBlur={this.handleClose}
                onClick={this.handleClick}
                onClose={this.handleClose}
                onFocus={this.handleOpen}
                onMouseEnter={this.handleOpen}
                onMouseLeave={this.handleClose}
                ButtonProps={{color: 'secondary'}}
                open={open}
            >
                {!hidden && actions.map(action => (
                    <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => this.handleClick(action)}
                    />
                ))}
            </SpeedDial>

        )
    }
}

export default withStyles(styles)(EventSpeedDial)
