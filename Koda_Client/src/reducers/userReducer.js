import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, SIGN_IN_REQUEST, SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from '../actions/types'

const INITIAL_STATE = {
    registering: null,
    loggedIn: null,
    _id: null,
    username: null,
    token: localStorage.getItem('TOKEN')
}

export default (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case REGISTER_REQUEST:
            return {...state, registering: true}
        case REGISTER_FAILURE:
        case REGISTER_SUCCESS:
            return {...state, registering: false}
        case SIGN_IN_REQUEST:
        case SIGN_IN_FAILURE:
            return {...state, loggedIn: false, _id: null, token: null, username: null}
        case SIGN_IN_SUCCESS:
            return {...state, loggedIn: true, ...action.payload}
        default:
            return state
    }
}