import React from 'react'
import {Field, reduxForm} from 'redux-form'

const LoginForm = (props) => {
    return (
        <form className="ui form" onSubmit={props.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <Field type="text" component="input" name="username" placeholder="username"/>
          </div>
          <div className="field">
            <label>Password</label>
            <Field type="password" component="input" name="password"/>
          </div>
          <button className="ui button" type="submit">Login</button>
        </form>
    )
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm)