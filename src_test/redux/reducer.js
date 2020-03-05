import { INCREASEMENT, DECREASEMENT } from "./actionTypes"
// import action from './action'

/*
 * @Author: your name
 * @Date: 2020-01-20 10:34:48
 * @LastEditTime : 2020-01-20 12:47:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/redux/reducer.js
 */

const initstate={
    count:1
}
export default (state = initstate, action) =>{
    switch (action.type){
        case INCREASEMENT:
            return {count:state.count + action.data}
        case DECREASEMENT:
            return {count:state.count - action.data}
        default:
            return state
    }
}