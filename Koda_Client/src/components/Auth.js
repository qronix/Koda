import React, { useEffect, useState } from 'react'
import { resourceRequest } from '../actions'
import { connect } from 'react-redux'


const renderContent = (payload) => {
    if (!payload) {
        return (
            <div className="ui segment">
                <div className="ui active dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
                <p></p>
            </div>
        )
    }
    else {
        return(
            <div className="ui segment">
                {payload.content}
            </div>
        )
    }
}

const Auth =  props => {
    const [payload, setPayload] = useState(props.payload)

    useEffect(() => {
         props.resourceRequest('/resourceTest', null, props.user.token)
        setPayload(props.payload)
    },[payload])
    return (
        renderContent(payload)
    )
}

const mapStateToProps = (state, ownProps) => {
    return { payload: state.resource.payload, user: state.user }
}

export default connect(mapStateToProps, { resourceRequest })(Auth)
