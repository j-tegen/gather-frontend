import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { default as SearchBarMUI } from 'material-ui-search-bar'

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    searchList: {
        position: 'absolute',
        left: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit / 2,
        backgroundColor: 'white',
        zIndex: 1,
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
    },
    coloredAvatar: {
        backgroundColor: theme.palette.primary.main,
    }
})

class SearchBar extends Component {
    state = {
        searchValue: '',
        showList: false,
    }

    handleChange(searchValue) {
        this.setState({ searchValue, showList: true })
        this.handleSearch(searchValue)
    }

    handleSearch(searchValue) {
        this.props.handleSearch(searchValue)
    }

    handleClose() {
        this.setState({ showList: false })
    }

    handleSelect(id) {
        console.log('SELECTED!', id)
        this.handleClose()
    }

    handleAdd(id) {
        this.props.handleAdd(id)
        this.handleClose()
    }

    render() {
        const { searchHits, handleSearch, loading, classes } = this.props

        return (
            <div className={classes.root}>
                <SearchBarMUI
                    placeholder="Find new friends"
                    // TODO: Upgrade when beta10 comes and uncomment these two lines
                    // cancelOnEscape
                    // onCancelSearch={() => this.setState({ searchValue: ''})}
                    onClick={() => this.setState({ showList: true })}
                    onChange={(value) => this.handleChange(value)}
                    onRequestSearch={(value) => handleSearch(value)}
                    value={this.state.searchValue}
                />
                { this.state.showList && this.state.searchValue &&
                    <Paper className={classes.searchList}>
                        <ClickAwayListener onClickAway={this.handleClose.bind(this)}>
                            <MenuList >
                                { this.renderSearchHits(loading, searchHits, classes) }
                                {loading &&
                                    <ListItem className={classes.loader} >
                                        <CircularProgress size={20}/>
                                    </ListItem>
                                }
                            </MenuList>
                        </ClickAwayListener>

                    </Paper>
                }
            </div>
        )
    }

    renderSearchHits(loading, searchHits, classes) {
        if (!loading && searchHits.length === 0) {
            return (
                <div className={classes.loader} >
                    <Typography variant="subheading">No hits :(</Typography>
                </div>
            )
        }
        return (
            searchHits.map(hit => (
                <MenuItem button key={hit.id} onClick={() => this.handleSelect(hit.id)}>
                    { hit.profilePicture
                        ? <Avatar src={hit.profilePicture}></Avatar>
                        : <Avatar className={classes.coloredAvatar}>{hit.firstName[0]}{hit.lastName[0]}</Avatar>
                    }
                    <ListItemText primary={`${hit.firstName} ${hit.lastName}`} secondary={hit.location.city} />
                    { hit.isFriend
                    ?   <Tooltip title="Friends" placement="left"><FavoriteIcon /></Tooltip>
                    :   <ListItemSecondaryAction>
                            <IconButton onClick={() => this.handleAdd(hit.id)}>
                                <PersonAddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </MenuItem>
            ))
        )

    }
}

export default withStyles(styles)(SearchBar)