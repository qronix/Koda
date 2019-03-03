import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import resourceReducer from './resourceReducer'

export default combineReducers({
    resource: resourceReducer,
    alert: alertReducer,
    user: userReducer,
    form: formReducer
})
