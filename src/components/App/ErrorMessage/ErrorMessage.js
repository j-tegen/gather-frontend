import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
    errorBlock: {
        display: 'inline-block',
        height: '100%',
    },
    errorIcon: {
        fontSize: '48px',
        color: '#ba000d',
        verticalAlign: 'middle',
    },
    errorText: {
        color: '#ba000d',
        marginLeft: theme.spacing.unit * 2,
        verticalAlign: 'middle',
    }
})

class ErrorMessage extends Component {
    render() {

        const { errorMessage, classes } = this.props
        return (
            <div>
                <div className={classes.errorBlock}>
                    <ErrorIcon className={classes.errorIcon} />
                </div>
                <div className={classes.errorBlock}>
                    <Typography className={classes.errorText} variant="subheading" gutterBottom >
                        {errorMessage}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ErrorMessage)