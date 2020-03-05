/*
 * @Author: your name
 * @Date: 2020-01-21 09:00:37
 * @LastEditTime : 2020-01-21 09:38:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/myredux.js
 */
export  const createStore = ( reducer ) =>{

    let state = reducer(undefined,{type:'@@redux/init'});
    let listeners = [];

    let getState = () => {
        return state;
    }

    let dispatch = ( action ) => {
        const newState = reducer(state, action)
        state = newState;
        listeners.forEach(listener => listener())
    }

    let subscribe = (listener) => {
        listeners.push(listener);
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

export const combineReducer = ( reducers ) => {
    return {
        
    }
}