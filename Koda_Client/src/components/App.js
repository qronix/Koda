import React from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const App = (props) => {
  return (
    <div className="ui container">
    <div className={`ui floating message ${(props.alert.hidden) ? 'hidden' : ''}`}>{props.alert.message}</div>
      <BrowserRouter>
        <div>
            <Header/>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/register' exact component={Register}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) =>{
  const {alert} = state;
  return {alert}
}

export default connect(mapStateToProps)(App)
