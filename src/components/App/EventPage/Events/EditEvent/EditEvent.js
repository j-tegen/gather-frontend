import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
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
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { TimePicker, DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns/esm'

import { UpdateEventMutation } from 'models/event/mutations'
import { EventQuery } from 'models/event/queries'
import { MyLocationsQuery } from 'models/location/queries'
import LoadingButton from '../../../LoadingButton/LoadingButton'
import ErrorMessage from '../../../ErrorMessage/ErrorMessage'
import Loader from '../../../Loader/Loader'
import { getErrors } from 'utilities/errors'
import { parseTime } from 'utilities/datetime'



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
    },

})


class EditEvent extends Component {
    state = {
        activeStep: 0,
        selectedLocation: '',
        loading: false,
        error: '',
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data && !nextProps.data.loading) {
            const { data: { event }} = nextProps
            const {
                id,
                title,
                description,
                startDate,
                startTime,
                endDate,
                endTime,
                minParticipants,
                maxParticipants,
                location: {
                    country,
                    street,
                    city,
                },
            } = event

            this.setState({
                eventData: {
                    id,
                    title,
                    description,
                    startDate,
                    startTime: parseTime(startTime),
                    endDate,
                    endTime: parseTime(endTime),
                    minParticipants,
                    maxParticipants,
                },
                locationData: {
                    country,
                    city,
                    street,
                },
            })
        }
    }

    handleNext = () => {
        const { activeStep } = this.state
        this.setState({
            ...this.state,
            activeStep: activeStep + 1,
        })
    }

    checkValidStep = () => {
        switch(this.state.activeStep) {
            case 0: {
                const { title, description, startDate, startTime } = this.state.eventData
                return title && description && startDate && startTime
            }
            case 1: {
                const { city, country } = this.state.locationData
                return city && country
            }
            default: {
                return true
            }
        }

    }

    handleBack = () => {
        const { activeStep } = this.state
        this.setState({
            activeStep: activeStep - 1,
            error: '',
        })
    }


    handleChange = (dataSet, prop) => event => {
        const data = { ...this.state[dataSet] }
        data[prop] = event.target.value
        this.setState({ ...this.state, [dataSet]: data })
    }

    handleChangeTime = (dataSet, prop) => event => {
        const data = { ...this.state[dataSet] }
        data[prop] = event
        this.setState({ ...this.state, [dataSet]: data })
    }

    handleSelect = (event, locations) => {
        const location = locations.find(location => location.id === event.target.value)
        const { city, street, country } = location || this.state.locationData
        this.setState({
            selectedLocation: event.target.value,
            locationData:{
                city,
                street,
                country,
            },
        })
    }

    handleSubmit = async () => {
        let { eventData, locationData } = this.state
        this.setState({loading: true})
        eventData = {
            ...eventData,
            startDate: eventData.startDate ? format(eventData.startDate, 'YYYY-MM-DD') : null,
            startTime: eventData.startTime ? format(eventData.startTime, 'HH:mm') : null,
            endDate: eventData.endDate ? format(eventData.endDate, 'YYYY-MM-DD') : null,
            endTime: eventData.endTime ? format(eventData.endTime, 'HH:mm') : null,
        }

        try {
            await this.props.mutate({
                variables: {
                    eventData,
                    locationData,
                },
            })
            this.props.handleClose()
        } catch(e) {
            const error = getErrors(e)
            this.setState({error, loading: false})
        }
    }

    render() {
        if (this.props.data && this.props.data.loading) {
			return <Loader />
		}
		if (this.props.data && this.props.data.error) {
			return <div>Error...</div>
        }

        const { classes, myLocationsQuery: { myLocations } } = this.props
        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        const { activeStep } = this.state
        const steps = ['Information', 'Location', 'Confirm']

        return (
            <Dialog classes={{ paper: dialogPaper }} fullWidth maxWidth={'sm'} fullScreen={this.props.fullScreen} open onClose={this.props.handleClose}>
                <DialogTitle className={classes.dialogTitle}>
                    <IconButton className={classes.closeButton} onClick={this.props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.headerContainer}>
                        <Typography className={classes.dialogTitleText} variant="display1" gutterBottom >
                            Update event
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 &&
                        this.renderInformation(classes)
                    }
                    {
                        activeStep === 1 &&
                        this.renderLocation(myLocations)
                    }
                    {
                        this.state.error &&
                        <ErrorMessage errorMessage={this.state.error} />
                    }
                </DialogContent>
                <DialogActions>
                    { activeStep !== 0 &&
                        <Button color="primary" onClick={this.handleBack}>
                            Back
                        </Button>
                    }
                    { activeStep < steps.length - 1 &&
                        <Button color="primary" disabled={!this.checkValidStep()} onClick={this.handleNext}>
                            Next
                        </Button>
                    }
                    { activeStep === steps.length - 1 &&
                        <LoadingButton
                            text="Save"
                            color="primary"
                            type="submit"
                            variant="contained"
                            loading={this.state.loading}
                            handleClick={this.handleSubmit} />
                    }
                </DialogActions>

            </Dialog>
        )
    }

    renderLocation(locations) {
        return (
            <div>
                <FormControl fullWidth>
                    <InputLabel htmlFor="location-select">Previous locations</InputLabel>
                    <Select
                        value={this.state.selectedLocation}
                        onChange={(evt) => this.handleSelect(evt, locations)}
                        inputProps={{
                            name: 'location',
                            id: 'location-select',
                        }}
                    >
                        { locations.map((location => {
                            return <MenuItem key={location.id} value={location.id}>{location.googleFormattedAddress}</MenuItem>
                        }))}
                    </Select>
                </FormControl>
                <TextField
                    id="city"
                    label="City"
                    fullWidth
                    required
                    value={this.state.locationData.city}
                    onChange={this.handleChange('locationData', 'city')}
                    margin="normal"
                />
                <TextField
                    id="street"
                    label="Street"
                    fullWidth
                    value={this.state.locationData.street}
                    onChange={this.handleChange('locationData', 'street')}
                    margin="normal"
                />
                <TextField
                    id="country"
                    label="Country"
                    fullWidth
                    value={this.state.locationData.country}
                    onChange={this.handleChange('locationData', 'country')}
                    margin="normal"
                />
            </div>
        )
    }

    renderInformation(classes) {
        return (
            <div>
                <TextField
                    id="title"
                    label="Title"
                    required
                    fullWidth
                    value={this.state.eventData.title}
                    onChange={this.handleChange('eventData', 'title')}
                    margin="normal"
                />
                <TextField
                    id="description"
                    label="Description"
                    fullWidth
                    required
                    multiline
                    rowsMax={4}
                    value={this.state.eventData.description}
                    onChange={this.handleChange('eventData', 'description')}
                    margin="normal"
                />
                <Grid className={classes.root} container spacing={8}>
                    <Grid className={classes.column} item xs={6}>
                        <DatePicker
                            label="Start date"
                            clearable
                            required
                            fullWidth
                            margin="normal"
                            value={this.state.eventData.startDate}
                            onChange={this.handleChangeTime('eventData', 'startDate')}
                            animateYearScrolling={false}
                        />
                    </Grid>
                    <Grid className={classes.column} item xs={6}>
                        <TimePicker
                            clearable
                            fullWidth
                            margin="normal"
                            required
                            ampm={false}
                            label="Start time"
                            value={this.state.eventData.startTime}
                            onChange={this.handleChangeTime('eventData', 'startTime')}
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.root} container spacing={8}>
                    <Grid className={classes.column} item xs={6}>
                        <DatePicker
                            label="End date"
                            clearable
                            fullWidth
                            margin="normal"
                            value={this.state.eventData.endDate}
                            onChange={this.handleChangeTime('eventData', 'endDate')}
                            animateYearScrolling={false}
                        />
                    </Grid>
                    <Grid className={classes.column} item xs={6}>
                        <TimePicker
                            clearable
                            fullWidth
                            margin="normal"
                            ampm={false}
                            label="End time"
                            value={this.state.eventData.endTime}
                            onChange={this.handleChangeTime('eventData', 'endTime')}
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.root} container spacing={8}>
                    <Grid className={classes.column} item xs={6}>
                        <TextField
                            id="number"
                            label="Minimum participants"
                            value={this.state.eventData.minParticipants}
                            inputProps={{ max: this.state.eventData.maxParticipants }}
                            fullWidth
                            type="number"
                            margin="normal"
                            onChange={this.handleChange('eventData', 'minParticipants')}
                        />
                    </Grid>
                    <Grid className={classes.column} item xs={6}>
                        <TextField
                            id="number"
                            label="Maximum participants"
                            inputProps={{ min: this.state.eventData.minParticipants }}
                            value={this.state.eventData.maxParticipants}
                            fullWidth
                            type="number"
                            margin="normal"
                            onChange={this.handleChange('eventData', 'maxParticipants')}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(compose(
        graphql(EventQuery, {
                options: ({ id }) => ( { variables: { id }})
            }
        ),
        graphql(UpdateEventMutation),
        graphql(MyLocationsQuery, { name: 'myLocationsQuery' }),
)(EditEvent))))