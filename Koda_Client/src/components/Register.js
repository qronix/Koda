import React from 'react'
import {connect} from 'react-redux'
import RegisterForm from './RegisterForm'
import {register, alert} from '../actions'

const Register = (props) => {
    return (
        <div>
            <RegisterForm onSubmit={props.register} alert={(message)=>props.alert(message)} registering={props.registering}/>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {registering:state.user.registering}
}

export default connect(mapStateToProps,{register, alert})(Register)