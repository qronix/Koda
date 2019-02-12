import React from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login'

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
            <Header/>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
