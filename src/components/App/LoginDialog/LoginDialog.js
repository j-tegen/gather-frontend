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
import CloseIcon from '@material-ui/icons/Close'

import withMobileDialog from '@material-ui/core/withMobileDialog'

import { TokenAuthMutation } from 'models/user/mutations'
import { MeQuery } from 'models/user/queries'


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

class LoginDialog extends Component {
    state = {
        username: '',
        password: '',
    }

    handleClose = () => {
        this.props.history.push(this.props.location.state.fromPath)
    }

    handleChange = (prop) => event => {
        this.setState({ ...this.state, [prop]: event.target.value})
    }

    handleSubmit = async () => {
        try {
            const variables = {
                username: this.state.username,
                password: this.state.password,
            }
            const response = await this.props.client.mutate({
                mutation: TokenAuthMutation,
                variables
            })
            console.log(response)

            const { token } = response.data.tokenAuth
            localStorage.setItem('session', JSON.stringify({ token: token }))

            const meResponse = await this.props.client.query({
                query: MeQuery
            })

            const {
                id,
                username,
                profile: {
                    firstName,
                    lastName,
                },
            } = meResponse.data.me


            localStorage.setItem('session', JSON.stringify({
                token,
                id,
                username,
                firstName,
                lastName,

            }))

            this.handleClose()
        } catch(e) {
            localStorage.removeItem('session')
            console.log(e)
        }
    }

    render() {
        const { classes } = this.props
        console.log(this.props)
        const dialogPaper = this.props.fullScreen ? classes.dialogPaperMobile : classes.dialogPaperDesktop
        return (
            <Dialog classes={{ paper: dialogPaper}} fullWidth maxWidth={'sm'} fullScreen={this.props.fullScreen} open onClose={this.handleClose}>
                <DialogTitle className={classes.dialogTitle}>
                    <IconButton className = {classes.closeButton}
                            onClick = {this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.headerContainer}>
                        <Typography className={classes.dialogTitleText} variant="display1" gutterBottom >
                            Login
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="username"
                        label="Username"
                        fullWidth
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        fullWidth
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
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

export default withRouter(withMobileDialog()(withStyles(styles)(withApollo(LoginDialog))))