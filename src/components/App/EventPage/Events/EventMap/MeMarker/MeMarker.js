import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import PersonPinIcon from '@material-ui/icons/PersonPin'


const styles = (theme) => ({
	meMarker: {
		marginTop: -48,
		marginLeft: -16,
		fontSize: 32,
		color: theme.palette.secondary.main,
		'&:hover': {
			cursor: 'pointer',
		}
	},
})

class MeMarker extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				<Tooltip title="My position">
					<PersonPinIcon className={classes.meMarker}/>
				</Tooltip>
			</div>
		)
	}
}

export default withStyles(styles)(MeMarker)