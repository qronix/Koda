import {SIGN_IN, REGISTER_REQUEST, ALERT, REGISTER_SUCCESS} from './types'
import network from '../apis/network'

export const signIn = formValues => async (dispatch, getState) =>{
    const response = await network.post('/login',{...formValues})
    console.log(response)
    if(response){
        dispatch({type:SIGN_IN, payload:response.data.userId})
    }
}

export const register = formValues => async (dispatch, getState) => {
    var response = null
    try{
        dispatch({type: REGISTER_REQUEST})
        response = await network.post('/register',{...formValues})
        dispatch({type: REGISTER_SUCCESS})
        dispatch(alert(response.data))
        // dispatch({type:REGISTER, payload:})
    }catch(err){
        dispatch(alert(err.response.data))
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

