import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import {signIn} from '../actions'

const Login = (props) => {
  return(
      <div>
          <LoginForm onSubmit={props.signIn}/>
          <div>Userid: {props.userId}</div>
          <Link to="/register">Register</Link>
      </div>
  )
}

const mapStateToProps = (state, ownProps)=>{
    return {userId:state.auth.userId}
}
export default connect(mapStateToProps,{signIn})(Login)