/*
 * @Author: your name
 * @Date: 2020-01-20 10:33:23
 * @LastEditTime : 2020-01-21 09:46:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edityar
 * @FilePath: /react-fp-admin/src/index.js
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'
import store  from './redux/store'

// ReactDOM.render(
//     <Provider store = { store }>
//         <App/>
//     </Provider>,document.getElementById('root')
// )

store.subscribe(ReactDOM.render(
    <App store = {store} />,
    document.getElementById('root')
))