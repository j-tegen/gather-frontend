import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LocationOnIcon from '@material-ui/icons/LocationOn'


const styles = (theme) => ({
	mapMarker: {
		fontSize: '32px',
		'&:hover': {
			color: theme.palette.secondary.main,
			fontSize: '32px',
			cursor: 'pointer',
		}
	},
	hovered: {
		color: theme.palette.secondary.main,
		fontSize: '32px',
	},
	selected: {
		color: theme.palette.secondary.main,
		fontSize: '32px',
	}
})

class MapMarker extends Component {
	render() {
		const { classes, hovered, selected } = this.props
		const classNames = `${classes.mapMarker} ${hovered ? classes.hovered : ''} ${selected ? classes.selected : ''}`
		return (
			<div>
				<LocationOnIcon
					onClick={() => this.props.handleSelectEvent(this.props.event)}
					onMouseEnter={() => this.props.handleMouseEnter(this.props.event)}
					onMouseLeave={() => this.props.handleMouseLeave()}
					className={classNames} />
			</div>
		)
	}
}

export default withStyles(styles)(MapMarker)