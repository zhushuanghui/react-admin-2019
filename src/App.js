/*
 * @Author: your name
 * @Date: 2019-12-10 16:52:22
 * @LastEditTime: 2019-12-12 17:32:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/App.js
 */
//跟组件
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './reset.css';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

export default class App extends React.Component{
  render(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
            </Switch>
        </BrowserRouter>
    )
  }
}