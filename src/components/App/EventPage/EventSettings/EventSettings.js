import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { SaveIcon } from '@material-ui/icons/Save'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider'
import { debounce } from 'throttle-debounce'


const styles = theme => ({
    drawer: {
        minHeight: '200px',
        overflow: 'hidden',
        width: '100vw',
    },
    // slider: {
    //     width:
    // }
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
        const { classes, open, toggleOpen,handleSaveSettings } = this.props

        return (
            <Drawer
                anchor="bottom"
                open={this.props.open}
                onClose={toggleOpen}
            >
                <Grid className={classes.drawer} container justify="center" spacing={16}>
                    <Grid item xs={4}>
                        <Slider min={5} max={50} step={1} value={this.state.proximity} onChange={(evt, value) => this.handleChange('proximity', value)} />
                    </Grid>
                    <Grid item>
                        <Button onClick={this.handleSave.bind(this)} color="primary" type="raised">Save</Button>
                    </Grid>
                </Grid>
            </Drawer>
        )
    }
}

export default withStyles(styles)(EventToolbar)

