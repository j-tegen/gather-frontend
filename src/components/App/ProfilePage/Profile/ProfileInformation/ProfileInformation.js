import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import InformationBox from '../../../InformationBox/InformationBox'

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
        const { profile } = props
        this.state = {
            profileId: profile.id,
            password: '',
            description: profile.description,
            firstName: profile.firstName,
            lastName: profile.lastName,
            birthDate: profile.birthDate,
            gender: profile.gender,
            city: profile.location.city,
            country: profile.location.country,
            street: profile.location.street,
            loading: false,
            tabIndex: 0,
            success: false,
        }
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
            </div>
        )
    }

    renderInformation(classes) {
        return (
            <div className={classes.tabPage}>
                <InformationBox
                    label="Email"
                    value={this.state.email}
                />
                <InformationBox
                    label="First name"
                    value={this.state.firstName}
                />
                <InformationBox
                    label="Last name"
                    value={this.state.lastName}
                />
                <InformationBox
                    label="About me"
                    value={this.state.description}
                />
                <InformationBox
                    label="Age"
                    value={this.state.birthDate}
                />
                <InformationBox
                    label="City"
                    value={this.state.city}
                />
                <InformationBox
                    label="Country"
                    value={this.state.country}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ProfileInformation)