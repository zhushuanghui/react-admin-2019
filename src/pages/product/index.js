/*
 * @Author: your name
 * @Date: 2019-12-17 14:32:00
 * @LastEditTime: 2019-12-24 16:39:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/product/index.js
 */
import React, { Component } from 'react'
import './index.less'
import {Switch,Route,Redirect} from 'react-router-dom';
import ProductDetail from './product-detail';
import ProductUpdate from './product-update';
import Product from './Product';

export class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={Product} exact/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Route path='/product/update' component={ProductUpdate}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}

export default Index
