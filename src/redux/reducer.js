import action from './actions'

import { LOGILOAD, RECIVE_USER } from './actionTypes'

let initState = {
    isloading:false,
    user:{}
}

export default (state = initState, action)=>{
    switch (action.type) {
        case LOGILOAD:
            return {
                ...state,isloading:action.data
            }
        case RECIVE_USER:
            return {
                ...state,user:action.user
            }
        default:
            return state
    }
}
