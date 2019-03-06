import React from 'react'
import {Router,Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import history from '../history'
import Auth from './Auth'
import {Message, Container} from 'semantic-ui-react'

const App = (props) => {

  return (
    // <div className="ui container">
    <Container ui color='black'>
    {/* <div className={`ui floating message ${(props.alert.hidden) ? 'hidden' : ''}`}>{props.alert.message}</div> */}
    <Message className={`ui floating message ${(props.alert.hidden) ? 'hidden' : ''} ${props.alert.type === 'error' ? 'error' : 'success'}`} content={props.alert.message}/> 
      <Router history={history}>
        <div>
            <Header/>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/register' exact component={Register}></Route>
              <Route path='/auth' exact component={Auth}></Route>
            </Switch>
        </div>
      </Router>
    </Container>
  )
}


const mapStateToProps = (state) =>{
  const {alert} = state;
  return {alert}
}

export default connect(mapStateToProps)(App)
