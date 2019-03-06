import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, REGISTER_REQUEST,
    REGISTER_SUCCESS, REGISTER_FAILURE, RESOURCE_REQUEST, RESOURCE_REQUEST_FAILURE, 
    RESOURCE_REQUEST_SUCCESS, 
    ALERT_SUCCESS,
    ALERT_FAILURE, CLEAR, NAVIGATE} from './types'
import network from '../apis/network'
import history from '../history'
import {SUCCESS, ERROR} from '../_config/messageTypes'

export const signIn = formValues => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGN_IN_REQUEST })
        const response = await network.post('/login',{ user: { ...formValues } })
        if (response) {
            if (response.status === 200) {
                dispatch({ type: SIGN_IN_SUCCESS, payload: { ...response.data.user } })
                dispatch(alert(response.data.success, SUCCESS))
                history.push('/auth')
            }
        }
    } catch (err) {
        dispatch({ type: SIGN_IN_FAILURE })
        dispatch(alert(err.response.data.error, ERROR))
    }
}

export const resourceRequest = (resource, options, token) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESOURCE_REQUEST, payload: resource })
        const response = await network.get(resource, {
            data: { ...options },
            headers: {
                'Authorization' : `Token ${token}`
            }
        })
        if (response) {
            if (response.status === 200) {
                dispatch({ type: RESOURCE_REQUEST_SUCCESS, payload: { ...response.data.payload } })
            }
        }
    } catch (err) {
        dispatch({ type: RESOURCE_REQUEST_FAILURE })
        if (err.response) {
            dispatch(alert(err.response.data.error, ERROR))
            if(err.response.status === 401){
                dispatch({type: RESOURCE_REQUEST_FAILURE})
                history.push('/')
            }
        }
        else{
            dispatch(alert('Could not complete request', ERROR))
        }
    }
}

export const register = formValues => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const response = await network.post('/register',{ user: { ...formValues } })
        if (response) {
            dispatch({ type: REGISTER_SUCCESS })
            dispatch(alert(response.data.success, SUCCESS))
            history.push('/login')
        }
    } catch (err) {
        dispatch({ type: REGISTER_FAILURE })
        if (err.response) {
            dispatch(alert(err.response.data.error, ERROR))
        } else {
            dispatch(alert('A network error occurred', ERROR))
        }
    }    
}

export const alert = (message,messageType) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(clearAlert())
    }, 2000 )
    const type = messageType === SUCCESS ? ALERT_SUCCESS : ALERT_FAILURE
    dispatch ({ type, payload:{ message, hidden:false, type:messageType } })
}

const clearAlert = () => {
    const messageObj = { message:'', hidden: true }
    return ({ type: CLEAR, payload:messageObj })
}

export const navigate = location => (dispatch, getState) => {
    dispatch({ type: NAVIGATE, payload:location })
    if(history.location !== location) {
        history.push(`/${ location === 'home' ? '' : location }`)
    }
}

