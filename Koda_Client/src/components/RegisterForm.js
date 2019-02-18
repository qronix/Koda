import React, {useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import {REGISTER_FORM_CONFIG} from '../_config'

const RegisterForm = (props) => {
    const {valid} = props
    return (
        <form className="ui form segment error" onSubmit={submitForm}> 
            <Field name="username" component={renderInput} label="Username"/>
            <Field type="password" component={renderInput} label="Password" name="password"/>
            <Field type="password" component={renderInput} label="Confirm Password" name="password_confirm"/>
            <Field type="email"    component={renderInput} label="Email" name="email"/>
            <button className="ui button" type="submit" disabled={!valid}>Submit</button>
        </form>
    )
}
const submitForm = (e)=>{
    e.preventDefault()
}
const renderInput = ({input,label, meta})=>{
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return(
        <div className={className}>
            <label>{label}</label>
            <input {...input}/>
            {renderError(meta)}
        </div>
    )
}
const renderError = ({error,touched})=>{
    if(touched && error){
        return(
            <div className="ui basic red pointing prompt label transition visible">{error}</div>
        )
    }
}
const validate = (formValues)=>{
    const errors = {}
    const {username, password, password_confirm, email} = formValues
    if(!username){
        errors.username = 'Username is required'
    }
    else if(username.length < REGISTER_FORM_CONFIG.MIN_USERNAME_LENGTH){
        errors.username = 'Username is too short'
    }
    if(!password){
        errors.password = 'Password is required'
    }
    else if(password.length < REGISTER_FORM_CONFIG.MIN_PASSWORD_LENGTH){
        errors.password = `Password must be at least ${REGISTER_FORM_CONFIG.MIN_PASSWORD_LENGTH}`
    }
    if(!password_confirm){
        errors.password_confirm = 'Password confirm is required'
    }
    else if(password_confirm !== password){
        errors.password = 'Passwords do not match'
    }
    if(!email){
        errors.email = 'Email is required'
    }
    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm)