import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    emptyStateIcon: {
        '& svg': {
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '160px',
            color: 'rgba(0, 0, 0, 0.45)',
            width: '100%',
            marginTop: '20vh',
        },
    },
    emptyStateText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        textAlign: 'center',
    }
})

class EmptyState extends Component {
    render() {
        const { classes, header, subheader, icon } = this.props
        const Icon = () => icon

        return (
            <div>
                <div className={classes.emptyStateIcon}>
                    {icon}
                </div>
                <Typography className={classes.emptyStateText} variant="title" gutterBottom >
                    {header}
                </Typography>
                <Typography className={classes.emptyStateText} variant="body2" gutterBottom >
                    {subheader}
                </Typography>
            </div>
        )

    }
}

export default withStyles(styles)(EmptyState)