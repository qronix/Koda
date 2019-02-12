import {SIGN_IN} from './types'
import network from '../apis/network'

export const signIn = formValues => async (dispatch, getState) =>{
    const response = await network.post('/login',{...formValues})
    console.log(response)
    if(response){
        dispatch({type:SIGN_IN, payload:response.data.userId})
    }
}