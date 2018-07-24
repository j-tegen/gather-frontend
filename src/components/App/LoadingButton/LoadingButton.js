import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    whiteLoader: {
        color: 'white',
    }
})

class LoadingButton extends Component {
    render() {
        const {
            classes,
            loading = false,
            text = '',
            disabled = false,
            variant = 'flat',
            color = 'primary',
            handleClick,
            type = 'button',
        } = this.props
        const whiteLoader = ['contained', 'raised'].indexOf(variant) > -1
        const loaderClass = whiteLoader ? classes.whiteLoader : ''

        return (
            <div>
                {
                    !loading &&
                    <Button
                        type={type}
                        variant={variant}
                        disabled={disabled}
                        color={color}
                        onClick={handleClick}>
                        {text}
                    </Button>
                }
                {
                    loading &&
                    <Button
                        type={type}
                        variant={variant}
                        disabled={disabled}
                        color={color}>
                        <CircularProgress className={loaderClass} size={20}/>
                    </Button>
                }
            </div>
        )
    }
}

export default withStyles(styles)(LoadingButton)
