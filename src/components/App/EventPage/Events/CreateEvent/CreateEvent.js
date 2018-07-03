import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns/esm'

import { CreateEventMutation } from 'models/event/mutations'



const styles = theme => ({
    dialogPaperMobile: {
        overflow: 'hidden',
    },
    dialogPaperDesktop: {
        overflow: 'hidden',
        top: '10vh',
        position: 'absolute',
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        height: '200px',

    },
    dialogTitleText: {
        color: 'white',
    },
    headerContainer: {
        marginTop: '40px',
        textAlign: 'center',
    },
    closeButton: {
        color: 'white',
        position: 'absolute',
        top: theme.spacing.unit,
        right: theme.spacing.unit,
    }

})


class CreateEvent extends Component {
    state = {
        eventData: {
            title: 'Test',
            description: 'Test',
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
            eventType: 'Gaming',
            minParticipants: 0, // TBI
            maxParticipants: 5, // TBI
        },
        locationData: {
            id: null,
            street: 'Järnåkravägen 23A',
            city: 'Lund',
            country: 'Sweden',
        },
    }

    handleClose = () => {
        this.props.history.push('/events')
    }

    handleChange = (dataSet, prop) => event => {
        const data = { ...this.state[dataSet] }
        data[prop] = event.target.value
        this.setState({ [dataSet]: data })
    }

    handleChangeTime = (dataSet, prop) => event => {
        const data = { ...this.state[dataSet] }
        data[prop] = event
        this.setState({ [dataSet]: data })
    }

    handleSubmit = async () => {
        let { eventData, locationData } = this.state
        eventData = {
            ...eventData,
            startDate: eventData.startDate ? format(eventData.startDate, 'YYYY-MM-DD') : null,
            startTime: eventData.startTime ? format(eventData.startTime, 'HH:mm') : null,
            endDate: eventData.endDate ? format(eventData.endDate, 'YYYY-MM-DD') : null,
            endTime: eventData.endTime ? format(eventData.endTime, 'HH:mm') : null,
        }
        console.log(eventData)

        this.props.mutate({
            variables: {
                eventData,
                locationData
            }
        }).then(() => this.handleClose())
        .catch((error) => console.log(error))

    }

    render() {
        const { classes } = this.props
        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop

        return (
            <Dialog classes={{ paper: dialogPaper }} fullWidth maxWidth={'sm'} fullScreen={this.props.fullScreen} open onClose={this.handleClose}>
                <DialogTitle className={classes.dialogTitle}>
                    <IconButton className={classes.closeButton} onClick={this.props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.headerContainer}>
                        <Typography className={classes.dialogTitleText} variant="display1" gutterBottom >
                            Create event
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        fullWidth
                        value={this.state.eventData.title}
                        onChange={this.handleChange('eventData', 'title')}
                        margin="normal"
                    />
                    <TextField
                        id="description"
                        label="Description"
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={this.state.eventData.description}
                        onChange={this.handleChange('eventData', 'description')}
                        margin="normal"
                    />
                    <DatePicker
                        label="Start date"
                        clearable
                        fullWidth
                        margin="normal"
                        value={this.state.eventData.startDate}
                        onChange={this.handleChangeTime('eventData', 'startDate')}
                        animateYearScrolling={false}
                    />
                    <TimePicker
                        clearable
                        fullWidth
                        margin="normal"
                        ampm={false}
                        label="Start time"
                        value={this.state.eventData.startTime}
                        onChange={this.handleChangeTime('eventData', 'startTime')}
                    />
                    <DatePicker
                        label="End date"
                        clearable
                        fullWidth
                        margin="normal"
                        value={this.state.eventData.endDate}
                        onChange={this.handleChangeTime('eventData', 'endDate')}
                        animateYearScrolling={false}
                    />
                    <TimePicker
                        clearable
                        fullWidth
                        margin="normal"
                        ampm={false}
                        label="End time"
                        value={this.state.eventData.endTime}
                        onChange={this.handleChangeTime('eventData', 'endTime')}
                    />




                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleClose}>
                        Cancel
                        </Button>
                    <Button color="primary" type="submit" onClick={this.handleSubmit}>
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(graphql(CreateEventMutation)(CreateEvent))))
