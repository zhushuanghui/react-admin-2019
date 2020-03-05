
import React from 'react';
import {BrowserRouter,HashRouter, Route, Switch} from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import './reset.css';
import './App.less'
import Login from './pages/login/Login';
import LoginRedux from './pages/login/Login_redux';
import Admin from './pages/admin/Admin';

export default class App extends React.Component{
    render(){
    return(
        <Provider store = { store }>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={ LoginRedux }></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
    }
}