import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit*2,
        color: theme.palette.primary.main,
    },
    content: {
        paddingBottom: '0px',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    imageInput: {
        display: 'none',
    }
})

class ImageUpload extends Component {

    state = {
        src: null,
        crop: {
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            aspect: 1 / 1,
        },
        croppedImage: null,
    }

    handleSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                () =>
                this.setState({
                    src: reader.result,
                }),
                false
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    onCropChange = (crop) => {
        this.setState({
            crop
        })
    }

    onImageLoaded = (image) => {
        this.setState({
            crop: makeAspectCrop({
                x: 25,
                y: 0,
                aspect: 1 / 1,
                width: 50,
            }, image.width / image.height),
        })
    }

    onCropComplete = async crop => {
        const croppedImage = await this.getCroppedImg(new Image(), crop, "profile_picture.png")
        this.setState({croppedImage})
    }

    _openFileDialog () {
        var fileUploadDom = React.findDOMNode(this.refs.fileUpload)
        fileUploadDom.click()
    }

    getCroppedImg(image, pixelCrop, fileName) {

        const canvas = document.createElement('canvas')
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob(file => {
                file.name = fileName
                resolve(file)
            }, 'image/png')
        })
    }

    render() {
        const { title, handleOk, handleCancel, open, classes } = this.props
        return (
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.title} id="alert-success-title">
                    {title}
                </DialogTitle>
                <DialogContent className={classes.content}>
                {
                    this.state.src && (
                    <ReactCrop
                        src={this.state.src}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                    )
                }

                </DialogContent>
                <DialogActions>
                    { this.renderFileInput() }
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }

    renderFileInput() {
        return (
            <div>
                 <input
                    className={this.props.classes.imageInput}
                    accept="image/*"
                    id="raised-button-file"
                    onChange={this.handleSelectFile.bind(this)}
                    type="file"
                />
                <label htmlFor="raised-button-file">
                    <Button color="primary" component="span">
                        Select image
                    </Button>
                </label>
            </div>
        )
    }
}

export default withStyles(styles)(ImageUpload)