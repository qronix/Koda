import {SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, REGISTER_REQUEST, ALERT, REGISTER_SUCCESS, REGISTER_FAILURE} from './types'
import network from '../apis/network'
import history from '../history'

export const signIn = formValues => async (dispatch, getState) =>{
    try{
        dispatch({type:SIGN_IN_REQUEST})
        const response = await network.post('/login',{ user: { ...formValues } })
        if(response){
            if(response.status === 200){
                console.log({...response.data.user})
                dispatch({type:SIGN_IN_SUCCESS, payload:{...response.data.user}})
                dispatch(alert(response.data.success))
            }
            // send username and _id to store
        }
    } catch (err){
        dispatch(alert(`Error ${err.response.data}`))
    }
}

export const register = formValues => async (dispatch, getState) => {
    try{
        dispatch({type: REGISTER_REQUEST})
        const response = await network.post('/register',{ user: { ...formValues } })
        if(response){
            dispatch({type: REGISTER_SUCCESS})
            //Have resource server send a success object so this works
            console.dir(response.data.success)
            dispatch(alert(response.data.success))
            history.push('/login')
        }
    }catch(err){
        dispatch({type: REGISTER_FAILURE})
        if(err.response){
            dispatch(alert(`Error ${err.response.data.error}`))
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

