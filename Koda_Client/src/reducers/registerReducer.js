import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE} from '../actions/types'

export default (state={}, action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
            return {registering: true}
        case REGISTER_SUCCESS:
        case REGISTER_FAILURE:
            return {}
        default:
            return state
    }
}