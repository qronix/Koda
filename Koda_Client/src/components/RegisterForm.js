import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {REGISTER_FORM_CONFIG} from '../_config'
import {Container, Form, Button} from 'semantic-ui-react'

const RegisterForm = (props) => {
    const {valid} = props
    return (
        <Container>
            <Form className="error" onSubmit={props.handleSubmit}>
                <Field name="username" component={renderSemInput} label="Username"/>
                <Field name="password" component={renderSemInput} label="Password" type="password"/>
                <Field name="password_confirm" component={renderSemInput} label="Confirm Password" type="password"/>
                <Field name="email" label="Email" component={renderSemInput} label="Email" type="email"/>
                <Button color='violet' loading={props.registering} disabled={!valid}>Register</Button>
            </Form>
                    {/* <form className="ui form small segment error" onSubmit={props.handleSubmit}> 
            <Field name="username" component={renderInput} label="Username"/>
            <Field type="password" component={renderInput} label="Password" name="password"/>
            <Field type="password" component={renderInput} label="Confirm Password" name="password_confirm"/>
            <Field type="email"    component={renderInput} label="Email" name="email"/>
            <button className="ui button" type="submit" disabled={false}>
                {renderButton(props.registering)}
            </button>
        </form> */}
        </Container>
    )
}

const renderSemInput = ({name, label, width, meta, type, input}) => {
    const className= `field ${meta.error && meta.touched ? 'error' : ''}`
    return(
        <div>
            <Form.Input label={label} name={name} width={width} type={type} className={className} {...input}></Form.Input>
            {/* <Message error content={meta.error} attached bottom></Message> */}
            {renderError(meta)}
        </div>
    )
}
const renderButton = (registering)=>{
    if(!registering){
        return 'Register'
    }else{
        return <div className="ui active inline"></div>
    }
}
const renderInput = ({input, label, meta, type})=>{
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return(
        <div className={className}>
            <label>{label}</label>
            <input type={type} {...input}/>
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
        errors.password = `Password must be at least ${REGISTER_FORM_CONFIG.MIN_PASSWORD_LENGTH} characters`
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