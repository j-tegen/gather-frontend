import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LocationOnIcon from '@material-ui/icons/LocationOn'


const styles = (theme) => ({
	mapMarker: {
		marginTop: -48,
		marginLeft: -16,
		fontSize: 32,
		'&:hover': {
			color: theme.palette.secondary.main,
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
	},

})

class MapMarker extends Component {
	render() {
		const { classes, hovered, selected } = this.props
		const classNames = `${classes.mapMarker} ${hovered ? classes.hovered : ''} ${selected ? classes.selected : ''}`
		return (
			<div>
				<LocationOnIcon
					className={classNames}
					onClick={() => this.props.handleSelectEvent(this.props.event)}
					onMouseEnter={() => this.props.handleMouseEnter(this.props.event)}
					onMouseLeave={() => this.props.handleMouseLeave()}
					/>
			</div>
		)
	}
}

export default withStyles(styles)(MapMarker)