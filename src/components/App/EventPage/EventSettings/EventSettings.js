import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider'


const styles = theme => ({
    root: {
        width: '50vw',
        left: '25vw',
        borderRadiusTopLeft: '6px',
        borderRadiusTopRight: '6px',
    },
    content: {
        minHeight: '200px',
        overflow: 'hidden',
        width: '100%',
        padding: theme.spacing.unit*2,
    },
    actions: {
        position: 'relative',
    },
    saveButton: {
        position: 'absolute',
        right: theme.spacing.unit*2
    }
})


class EventToolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proximity: props.proximity,
            onlyFuture: props.onlyFuture
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value,
        })
    }

    handleSave() {
        this.props.handleSaveSettings(this.state)
        this.props.toggleOpen()
    }

    render() {
        const { classes, toggleOpen } = this.props
        return (
            <Drawer
                className={classes.root}
                anchor="bottom"
                open={this.props.open}
                onClose={toggleOpen}
            >
                <Grid className={classes.content} container justify="center" spacing={16}>
                    <Grid item xs={12} md={4}>
                        <Typography id="label">Nearby event range (km)</Typography>
                        <Slider min={5} max={50} step={1} value={this.state.proximity} onChange={(evt, value) => this.handleChange('proximity', value)} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(evt, value) => this.handleChange('onlyFuture', value)}
                                    checked={this.state.onlyFuture}
                                />
                            }
                            label="Show only future event"
                        />
                        <div className={classes.actions}>
                            <Button className={classes.saveButton} onClick={this.handleSave.bind(this)} color="primary" type="raised">Save</Button>
                        </div>
                    </Grid>
                </Grid>
            </Drawer>
        )
    }
}

export default withStyles(styles)(EventToolbar)

