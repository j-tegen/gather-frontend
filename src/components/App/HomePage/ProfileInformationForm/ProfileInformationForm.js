import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import { format } from 'date-fns/esm'
import { DatePicker } from 'material-ui-pickers'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import { UpdateProfileMutation } from 'models/profile/mutations'
import { UpdateProfileLocationMutation } from 'models/location/mutations'
import LoadingButton from '../../LoadingButton/LoadingButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
    tabPage: {
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },
    saveButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    success: {
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    snackMessage: {
        display: 'flex',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 20,
    }
})

class ProfileInformation extends Component {
    constructor(props) {
        super(props)
        const { user } = props
        this.state = {
            profileId: user.profile.id,
            username: user.username,
            password: '',
            email: user.email,
            description: user.profile.description,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            birthDate: user.profile.birthDate,
            gender: user.profile.gender,
            city: user.profile.location.city,
            country: user.profile.location.country,
            street: user.profile.location.street,
            loading: false,
            tabIndex: 0,
            success: false,
        }
    }

    handleSaveInformation = async () => {
        try {
            this.setState({ loading: true })
            const variables = {
                profileData: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birthDate: this.state.birthDate ? format(this.state.birthDate, 'YYYY-MM-DD') : null,
                    gender: this.state.gender,
                    description: this.state.description,
                    email: this.state.email,
                }
            }
            await this.props.mutate({
                mutation: UpdateProfileMutation,
                variables
            })
            this.setState({ success: true })

        } catch(e) {
            console.log(e)
        }
        this.setState({ loading: false })
    }

    handleSaveLocation = async () => {
        try {
            this.setState({ loading: true })
            const variables = {
                profileId: this.state.profileId,
                locationData: {
                    city: this.state.city,
                    street: this.state.street,
                    country: this.state.country,
                }
            }

            await this.props.mutate({
                mutation: UpdateProfileLocationMutation,
                variables
            })
            this.setState({ success: true })
        } catch(e) {

        }
        this.setState({ loading: false })
    }

    handleSelect = (event, genderOptions) => {
        const option = genderOptions.find(option => option.key === event.target.value)

        this.setState({
            gender: option.key,
        })
    }

    handleChangeDate = prop => date => {
        this.setState({ [prop]: date })
    }

    handleChange = (prop) => event => {
        this.setState({ [prop]: event.target.value})
    }

    handleTabChange = (_, tabIndex) => {
        this.setState({ tabIndex })
    }

    handleCloseSnackbar() {
        this.setState({ success: false})
    }

    render() {
        const { classes } = this.props
        const { tabIndex } = this.state
        return (
            <div>
                <Tabs centered fullWidth indicatorColor="secondary" value={tabIndex} onChange={this.handleTabChange}>
                    <Tab label="Profile" />
                    <Tab label="Location" />
                </Tabs>
                {
                    tabIndex === 0 &&
                    this.renderInformation(classes)
                }
                {
                    tabIndex === 1 &&
                    this.renderLocation(classes)
                }
                {/* {
                    this.state.error &&
                    <ErrorMessage errorMessage={this.state.error} />
                } */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.success}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar.bind(this)}
                >
                    <SnackbarContent
                        className={classes.success}
                        message={
                            <span className={classes.snackMessage}>
                                <CheckCircleIcon className={classes.icon} />
                                Successfully saved!
                            </span>
                        }
                        action={
                            <IconButton
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleCloseSnackbar.bind(this)}
                            >
                                <CloseIcon className={classes.closeIcon} />
                            </IconButton>
                        } />
                </Snackbar>
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
            <form onSubmit={this.handleSaveInformation.bind(this)} className={classes.tabPage}>
                <TextField
                    id="username"
                    label="Username"
                    required
                    fullWidth
                    disabled
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                />
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
                <TextField
                    id="description"
                    label="About me"
                    fullWidth
                    multiline
                    rowsMax={4}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
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
                <LoadingButton
                    className={classes.saveButton}
                    text="Save"
                    color="primary"
                    type="submit"
                    variant="contained"
                    loading={this.state.loading}
                    handleClick={this.handleSaveInformation.bind(this)} />
            </form>
        )
    }

    renderLocation(classes) {
        return (
            <div className={classes.tabPage}>
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
                <LoadingButton
                    className={classes.saveButton}
                    text="Save"
                    color="primary"
                    type="submit"
                    variant="contained"
                    loading={this.state.loading}
                    handleClick={this.handleSaveLocation.bind(this)} />
            </div>
        )
    }
}

export default withStyles(styles)(compose(
    graphql(UpdateProfileMutation),
    graphql(UpdateProfileLocationMutation))(ProfileInformation))