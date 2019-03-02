// import {SIGN_IN, SIGN_IN_SUCCESS} from '../actions/types'

// const INITIAL_STATE = {
//     isSignedIn: null,
//     userId: null,
//     TOKEN: null
// }

// export default (state= INITIAL_STATE, action)=>{
//     switch(action.type){
//         case SIGN_IN:
//           return { ...state, isSignedIn: false, userId: null, TOKEN: null }
//         case SIGN_IN_SUCCESS:
//           return { ...state, isSignedIn: true , ...action.payload}

//         default:
//           return state
//     }
// }