import React, { useEffect, useState } from 'react'
import { resourceRequest } from '../actions'
import { connect } from 'react-redux'


const renderContent = (payload) => {
    console.dir(payload)
    if (!payload) {
        return (
            <div className="ui">
                <div className="ui active dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
                <p></p>
            </div>
        )
    }
    else {
        return(
            <div className="ui">
                {payload.content}
            </div>
        )
    }
}

const Auth =  props => {
    const [resource={}, setResource] = useState(props.payload)
    useEffect(() => {
         props.resourceRequest('/resourceTest', null, props.user.token)
        setResource(props.payload)
    },[resource])
    return (
        renderContent(props.payload)
    )
}

const mapStateToProps = (state, ownProps) => {
    console.dir(state.resource.payload)
    return { payload: state.resource.payload, user: state.user }
}

export default connect(mapStateToProps, { resourceRequest })(Auth)
