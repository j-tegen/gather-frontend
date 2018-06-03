import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing.unit,
    }
})

const InformationBox = (props) => {
    const { classes } = props

    return (
        <div className={classes.root}>
            <Typography variant="caption" gutterBottom >
                {props.label}
            </Typography>
            <Typography variant="subheading" gutterBottom >
                {props.value}
            </Typography>
        </div>
    )
}

export default withStyles(styles)(InformationBox)