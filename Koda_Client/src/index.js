import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(()=>{
  localStorage.setItem('TOKEN', store.getState().user.token)
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.querySelector('#root')
);