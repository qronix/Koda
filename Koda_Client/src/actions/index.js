import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, REGISTER_REQUEST, ALERT, 
    REGISTER_SUCCESS, REGISTER_FAILURE, RESOURCE_REQUEST, RESOURCE_REQUEST_FAILURE, 
    RESOURCE_REQUEST_SUCCESS } from './types'
import network from '../apis/network'
import history from '../history'

export const signIn = formValues => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGN_IN_REQUEST })
        const response = await network.post('/login',{ user: { ...formValues } })
        if (response) {
            if (response.status === 200) {
                dispatch({ type: SIGN_IN_SUCCESS, payload: { ...response.data.user } })
                dispatch(alert(response.data.success))
            }
        }
    } catch (err) {
        dispatch(alert(`Error ${err.response.data}`))
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
            dispatch(alert(err.response.data.error))
            if(err.response.status === 401){
                dispatch({type: RESOURCE_REQUEST_FAILURE})
                history.push('/')
            }
        }
        else{
            dispatch(alert('Could not complete request'))
        }
    }
}

export const register = formValues => async (dispatch, getState) => {
    console.dir(formValues)
    try {
        dispatch({ type: REGISTER_REQUEST })
        const response = await network.post('/register',{ user: { ...formValues } })
        if (response) {
            dispatch({ type: REGISTER_SUCCESS })
            //Have resource server send a success object so this works
            console.dir(response.data.success)
            dispatch(alert(response.data.success))
            history.push('/login')
        }
    } catch (err) {
        console.log(err)
        dispatch({ type: REGISTER_FAILURE })
        if (err.response) {
            dispatch(alert(err.response.data.error))
        } else {
            dispatch(alert('A network error occurred'))
        }
    }    
}

export const alert = message => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(clearAlert())
    }, 2000 )
    dispatch ({ type:ALERT, payload:{ message,hidden:false } })
}

const clearAlert = () => {
    const messageObj = { message:'', hidden: true }
    return ({ type: ALERT, payload:messageObj })
}

