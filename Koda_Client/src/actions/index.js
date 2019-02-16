import {SIGN_IN, REGISTER, ALERT} from './types'
import network from '../apis/network'

export const signIn = formValues => async (dispatch, getState) =>{
    const response = await network.post('/login',{...formValues})
    console.log(response)
    if(response){
        dispatch({type:SIGN_IN, payload:response.data.userId})
    }
}

export const register = formValues => async (dispatch, getState) => {
    const response = await network.post('/register',{...formValues})
    console.log(`Received register response as: ${response}`)
}

export const alert = (message) => (dispatch,getState)=>{
    setTimeout(()=>{
        dispatch(clearAlert())
    },2000)
    dispatch ({type:ALERT, payload:message})
}

const clearAlert = () =>{
    const messageObj = {message:'', hidden: true}
    return ({type: ALERT, payload:messageObj})
}

