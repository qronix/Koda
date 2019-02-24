import {SIGN_IN, REGISTER_REQUEST, ALERT, REGISTER_SUCCESS, REGISTER_FAILURE} from './types'
import network from '../apis/network'
import history from '../history'

export const signIn = formValues => async (dispatch, getState) =>{
    const response = await network.post('/login',{...formValues})
    if(response){
        dispatch({type:SIGN_IN, payload:response.data.userId})
    }
}

export const register = formValues => async (dispatch, getState) => {
    var response = null
    try{
        dispatch({type: REGISTER_REQUEST})
        response = await network.post('/register',{...formValues})
        if(response){
            dispatch({type: REGISTER_SUCCESS})
            dispatch(alert(`Success ${response.data}`))
            history.push('/login')
        }
    }catch(err){
        dispatch({type: REGISTER_FAILURE})
        if(err.response){
            dispatch(alert(`Error ${err.response.data}`))
        } else{
            dispatch(alert('A network error occurred'))
        }
    }    
}

export const alert = (message) => (dispatch,getState)=>{
    setTimeout(()=>{
        dispatch(clearAlert())
    },2000)
    dispatch ({type:ALERT, payload:{message,hidden:false}})
}

const clearAlert = () =>{
    const messageObj = {message:'', hidden: true}
    return ({type: ALERT, payload:messageObj})
}

