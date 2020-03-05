/*
 * @Author: your name
 * @Date: 2020-01-20 10:34:40
 * @LastEditTime : 2020-01-21 09:33:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/redux/store.js
 */
import { createStore } from '../myredux'

import reducer from './reducer'

// import devToolsEnhancer from 'remote-redux-devtools';


export default  createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )