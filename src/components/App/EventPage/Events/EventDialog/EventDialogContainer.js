import React from 'react'
import EventDialog from './EventDialog'


const EventDialogContainer = (props) => {

    return (
        <EventDialog id={props.match.params.id} {...props} />
    )
}

export default EventDialogContainer