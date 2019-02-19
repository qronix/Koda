import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/types'

const INITIAL_STATE = {
    registering: null,
    loggedIn: null
}

export default (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case REGISTER_REQUEST:
            return {...state, registering: true}
        case REGISTER_FAILURE:
        case REGISTER_SUCCESS:
            return {...state, registering: false}
        default:
            return state
    }
}