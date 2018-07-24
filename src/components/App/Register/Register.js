import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import CloseIcon from '@material-ui/icons/Close'

import { DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns/esm'

import withMobileDialog from '@material-ui/core/withMobileDialog'

import { RegisterMutation } from 'models/user/mutations'

import SuccessAlert from '../SuccessAlert/SuccessAlert'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LoadingButton from '../LoadingButton/LoadingButton'
import { getErrors } from 'utilities/errors'

const styles = theme => ({
    dialogPaperMobile: {
        overflow: 'hidden',
    },
    dialogPaperDesktop: {
        overflow: 'hidden',
        top: '10vh',
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
    },
    dialogTitleText: {
        color: 'white',
        height: '100px',
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

class Register extends Component {
    state = {
        username: '',
        password: '',
        passwordRepeat: '',
        email: '',
        street: '',
        city: '',
        country: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: null,
        activeStep: 0,
        success: false,
        error: '',
        loading: false,
    }

    handleSuccessOk = () => {
        this.setState({ success: false })
        this.handleClose()
    }

    handleOpenSuccessAlert = () => {
        this.setState({ success: true })
    }

    handleClose = () => {
        this.props.history.push(this.props.location.state.fromPath)
    }

    handleChange = (prop) => event => {
        this.setState({ [prop]: event.target.value})
    }

    handleChangeDate = prop => event => {
        this.setState({ [prop]: event })
    }

    handleSelect = (event, genderOptions) => {
        const option = genderOptions.find(option => option.key === event.target.value)

        this.setState({
            gender: option.key,
        })
    }

    handleSubmit = async () => {
        try {
            this.setState({ loading: true })
            const variables = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                profileData: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birthDate: this.state.birthDate ? format(this.state.birthDate, 'YYYY-MM-DD') : null,
                    gender: this.state.gender,
                },
                locationData: {
                    city: this.state.city,
                    country: this.state.country,
                    street: this.state.street,
                }
            }
            await this.props.client.mutate({
                mutation: RegisterMutation,
                variables
            })
            this.handleOpenSuccessAlert()
        } catch(e) {
            const error = getErrors(e)
            this.setState({ error, loading: false })
        }
    }

    handleBack = () => {
        const { activeStep } = this.state
        this.setState({
            activeStep: activeStep - 1,
            error: '',
        })
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
                const { username, email, password, passwordRepeat, firstName, lastName, birthDate } = this.state
                return username && email && password && firstName && lastName && birthDate && password === passwordRepeat
            }
            case 1: {
                const { city, country } = this.state
                return city && country
            }
            default: {
                return true
            }
        }

    }

    handleClose = () => {
        this.props.history.push('/events')
    }

    render() {
        const { classes } = this.props
        const steps = ['Information', 'Location', 'Confirm']
        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        const { activeStep } = this.state
        return (
            <div>
                <Dialog classes={{ paper: dialogPaper}} fullWidth maxWidth={'sm'} fullScreen={this.props.fullScreen} open onClose={this.handleClose}>
                    <DialogTitle className={classes.dialogTitle}>
                        <IconButton className = {classes.closeButton}
                                onClick = {this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.headerContainer}>
                            <Typography className={classes.dialogTitleText} variant="display1" gutterBottom >
                                Register
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
                            this.renderLocation()
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
                            <LoadingButton text="Save" color="primary" type="submit" variant="contained" handleClick={this.handleSubmit} />
                        }
                    </DialogActions>
                </Dialog>
                <SuccessAlert
                    open={this.state.success}
                    title="Sign up successful!"
                    description="Now what are you waiting for? Go on and log in!"
                    handleOk={this.handleSuccessOk}
                />
            </div>
        )
    }

    renderInformation(classes) {
        const genderOptions = [
            { key: 'NOANSWER', label: 'No answer'},
            { key: 'MALE', label: 'Male'},
            { key: 'FEMALE', label: 'Female'},
            { key: 'OTHER', label: 'Other'}
        ]
        return (
            <div>
                <TextField
                    id="email"
                    label="Email"
                    required
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="username"
                    label="Username"
                    required
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    fullWidth
                    required
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="repeat-password"
                    label="Repeat password"
                    fullWidth
                    required
                    type="password"
                    value={this.state.passwordRepeat}
                    onChange={this.handleChange('passwordRepeat')}
                    margin="normal"
                />
                <TextField
                    id="firstname"
                    label="First name"
                    required
                    fullWidth
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="lastname"
                    label="Last name"
                    required
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                />
                <DatePicker
                    keyboard
                    label="Date of birth"
                    format="YYYY-MM-DD"
                    fullWidth
                    margin="normal"
                    disableFuture
                    openToYearSelection
                    mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',  /\d/, /\d/] : [])}
                    value={this.state.birthDate}
                    onChange={this.handleChangeDate('birthDate')}
                    disableOpenOnEnter
                    animateYearScrolling={false}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="location-select">Gender</InputLabel>
                    <Select
                        value={this.state.gender}
                        onChange={(evt) => this.handleSelect(evt, genderOptions)}
                        inputProps={{
                            name: 'location',
                            id: 'location-select',
                        }}
                    >
                        { genderOptions.map((option => {
                            return <MenuItem key={option.key} value={option.key}>{option.label}</MenuItem>
                        }))}
                    </Select>
                </FormControl>
            </div>
        )
    }

    renderLocation() {
        return (
            <div>
                <TextField
                    id="city"
                    label="City"
                    fullWidth
                    required
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                />
                <TextField
                    id="street"
                    label="Street"
                    fullWidth
                    value={this.state.street}
                    onChange={this.handleChange('street')}
                    margin="normal"
                />
                <TextField
                    id="country"
                    label="Country"
                    fullWidth
                    value={this.state.country}
                    onChange={this.handleChange('country')}
                    margin="normal"
                />
            </div>
        )
    }
}

export default withRouter(withMobileDialog()(withStyles(styles)(withApollo(Register))))