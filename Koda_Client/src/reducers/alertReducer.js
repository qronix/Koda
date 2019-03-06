import { ALERT_SUCCESS, ALERT_FAILURE, ALERT_WARNING, CLEAR } from '../actions/types'

const INITIAL_STATE = {
    hidden: true,
    message: null,
    type: null
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALERT_SUCCESS:
        case ALERT_FAILURE:
        case ALERT_WARNING:
        case CLEAR:
            // return { ...state, message:action.payload.message, hidden:action.payload.hidden, type:action.payload.type }
            return {...state, ...action.payload}
        default:
            return state
    }
}