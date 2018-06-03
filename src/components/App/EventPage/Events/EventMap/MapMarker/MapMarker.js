import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LocationOnIcon from '@material-ui/icons/LocationOn'


const styles = (theme) => ({
	mapMarker: {
		color: theme.palette.secondary.dark,
		fontSize: '32px',
		'&:hover': {
			color: theme.palette.secondary.main,
			fontSize: '36px',
		}
	},
	hovered: {
		color: theme.palette.secondary.main,
		fontSize: '36px',
	},
	selected: {
		color: theme.palette.secondary.main,
		fontSize: '36px',
	}
})

class MapMarker extends Component {
	render() {
		const { classes, hovered, selected } = this.props
		const classNames = `${classes.mapMarker} ${hovered ? classes.hovered : ''} ${selected ? classes.selected : ''}`
		return (
			<div><LocationOnIcon className={classNames} /></div>
		)
	}
}

export default withStyles(styles)(MapMarker)