/*
 * @Author: your name
 * @Date: 2019-12-10 18:09:17
 * @LastEditTime: 2019-12-13 11:13:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/admin/Admin.js
 */
import React from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import MyHeader from '../../conponents/header/MyHeader'
import LeftNav from '../../conponents/left-nav/LeftNav'
import Home from '../home/Home'
import Product from '../product/Product'
import Catgory from '../product/catgory'
import Role from '../role/role'
import User from '../user/User'
import Pie from '../chart/Pie'
import Line from '../chart/Line'
import Bar from '../chart/Bar'

const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends React.Component{

    render(){
        const user=memoryUtils.user;
        if(!user||!user.username){
        //   this.props.history.replace('/');
            return <Redirect to='/login'/>;
        }
        return(
            <Layout style={{height:"100%",color:'#fff'}}>
                <Sider>
                    <LeftNav></LeftNav> 
                </Sider>
                <Layout>
                    <Header style={{height:"80px",background:"#fff",padding:0}}>
                        <MyHeader></MyHeader> 
                    </Header>
                    <Content style={{margin:"20px",background:"#fff"}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/user" component={User}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/category" component={Catgory}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}