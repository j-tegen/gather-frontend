import React from 'react'
import EditEvent from './EditEvent'


const EditEventContainer = (props) => {

    return (
        <EditEvent id={props.match.params.id} {...props} />
    )
}

export default EditEventContainer