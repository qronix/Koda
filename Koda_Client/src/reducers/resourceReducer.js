import { RESOURCE_REQUEST, RESOURCE_REQUEST_SUCCESS, RESOURCE_REQUEST_FAILURE } from '../actions/types'

const INITIAL_STATE = {
    resourceName: null,
    payload: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESOURCE_REQUEST:
            return { ...state, resourceName: action.payload }
        case RESOURCE_REQUEST_FAILURE:
            return state
        case RESOURCE_REQUEST_SUCCESS:
            return { ...state, payload: action.payload }
        default:
            return state
    }
}