import {ALERT} from '../actions/types'

const INITIAL_STATE = {
    hidden: true,
    message: null
}

export default(state=INITIAL_STATE, action)=>{
    console.log(action)
    switch(action.type){
        case ALERT:
            return {...state, message:action.payload.message, hidden:action.payload.hidden}
        default:
            return state
    }
}