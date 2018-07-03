import React from 'react'
import { default as MuiAppBar } from '@material-ui/core/AppBar'
import { Link, withRouter } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'



const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    flex: {
        flex: 1,
    },
})

class AppBar extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorElement: null,
        }
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    signOut() {
        localStorage.removeItem('session')
        window.location.reload()
    }

    render() {

        const { classes, handleToggle, session } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)
        console.log(session.token)
        return (
            <MuiAppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleToggle}
                        className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Gather
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu.bind(this)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose.bind(this)}
                        >
                            <MenuItem onClick={this.handleClose.bind(this)}>My profile</MenuItem>
                            {
                                !session.token
                                ? <Link to={{ pathname: '/login', state: { fromPath: this.props.location.pathname}}}  style={{ textDecoration: 'none', display: 'block' }}>
                                    <MenuItem >Sign in</MenuItem>
                                  </Link>
                                : <MenuItem onClick={this.signOut.bind(this)}>Sign out</MenuItem>
                            }
                        </Menu>
                    </div>
                </Toolbar>
            </MuiAppBar>
        )
    }
}

export default withRouter(withStyles(styles)(AppBar))
