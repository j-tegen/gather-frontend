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
})

function Loader(props) {
    const { classes } = props;
    return (
		<div className={classes.root}>
        	<CircularProgress className={classes.progress} />
		</div>
    )
}

export default withStyles(styles)(Loader)
