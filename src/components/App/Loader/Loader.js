import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    root: {
		width: '100px',
		height: '100%',
		position: 'relative',
		margin: 'auto',
	},
	progress: {
		position: 'absolute',
		height: '100px',
		top: '40%',
		marginTop: '-50px',
	},
	fullscreen: {
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
})

function Loader(props) {
		const { classes, fullscreen } = props;
		const rootClasses = `${classes.root} ${fullscreen ? classes.fullscreen : ''}`
    return (
		<div className={rootClasses}>
        	<CircularProgress className={classes.progress} />
		</div>
    )
}

export default withStyles(styles)(Loader)
