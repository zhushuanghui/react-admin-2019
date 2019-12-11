/*
 * @Author: your name
 * @Date: 2019-12-10 16:51:56
 * @LastEditTime: 2019-12-10 18:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/index.js
 */
// 入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import './reset.css';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
// import 'antd/dist/antd.css';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Admin}></Route>
        </Switch>
    </BrowserRouter>
,document.getElementById('root'));


