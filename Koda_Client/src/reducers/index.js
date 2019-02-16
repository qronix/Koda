import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import alertReducer from './alertReducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    form: formReducer
})
