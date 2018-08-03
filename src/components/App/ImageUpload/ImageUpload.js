import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { withStyles } from '@material-ui/core/styles'

import LoadingButton from '../LoadingButton/LoadingButton'
import { ProfilePictureMutation } from 'models/profile/mutations'
import { MeQuery } from 'models/user/queries'

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
        imageWidth: null,
        imageHeight: null,
        file: null,
        loading: false,
    }

    handleSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0])
            const img = new Image();
            img.onload = () => {
                this.setState({
                    imageWidth: img.width,
                    imageHeight: img.height,
                })
            }
            img.src = url

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
            this.setState({
                file: e.target.files[0]
            })
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
            imageHeight: image.height,
            imageWidth: image.width,
        })
    }


    async saveImage() {
        try {
            this.setState({ loading: true })
            const crop = {
                x0: (this.state.imageWidth * this.state.crop.x) / 100,
                x1: this.state.imageWidth * (this.state.crop.x + this.state.crop.width) / 100,
                y0: this.state.imageHeight * this.state.crop.y / 100,
                y1: this.state.imageHeight * (this.state.crop.y + this.state.crop.height) / 100,

            }
            await this.props.mutate({
                variables: {
                    profileId: this.props.profile.id,
                    file: this.state.file,
                    crop,
                }, update: (store, { data: { profilePicture: { profile } } }) => {

                    const { me } = store.readQuery({
                        query: MeQuery,
                    })

                    me.profile.profilePicture = profile.profilePicture

                    store.writeQuery({
                        query: MeQuery,
                        data: { me: me},
                    })
                    this.setState({ loading: false })
                    this.props.handleClose()
                }
            })
        } catch(e) {
            this.setState({ loading: false })
            console.log(e)
        }
    }

    render() {
        const { title, handleClose, open, classes } = this.props
        return (
            <Dialog
                open={open}
                onClose={handleClose}
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
                        onChange={this.onCropChange}
                    />
                    )
                }
                </DialogContent>
                <DialogActions>
                    { this.renderFileInput() }
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoadingButton
                        text="Save"
                        color="primary"
                        type="submit"
                        variant="flat"
                        disabled={!this.state.src}
                        loading={this.state.loading}
                        handleClick={this.saveImage.bind(this)} />
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

export default withStyles(styles)(graphql(ProfilePictureMutation)(ImageUpload))