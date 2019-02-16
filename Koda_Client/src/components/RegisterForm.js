import React from 'react'
import {Field, reduxForm} from 'redux-form'

const RegisterForm = (props) => {
    console.log(props)
    return (
        <form className="ui form" onSubmit={props.handleSubmit}> 
            <div className="field">
                <label>Username</label>
                <Field type="text" component="input" name="username" required/>
            </div>
            <div className="field">
                <label>Password</label>
                <Field type="password" component="input" name="password" required/>
            </div>
            <div className="field">
                <label>Confirm Password</label>
                <Field type="password" component="input" name="password_confirm" required/>
            </div>
            <div className="field">
                <label>Email</label>
                <Field type="email" component="input" name="email" required/>
            </div>
            <button className="ui button" type="submit">Submit</button>
            <button className="ui button" type="button" onClick={()=>props.alert({message:'Testing',hidden:false})}>Alert!</button>
        </form>
    )
}

export default reduxForm({
    form: 'registerForm'
})(RegisterForm)