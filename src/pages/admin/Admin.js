/*
 * @Author: your name
 * @Date: 2019-12-10 18:09:17
 * @LastEditTime: 2020-03-04 16:27:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/admin/Admin.js
 */
import React from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import {connect} from 'react-redux';
import memoryUtils from '../../utils/memoryUtils';

import MyHeader from '../../conponents/header/MyHeader'
import LeftNav from '../../conponents/left-nav/LeftNav'
import Home from '../home/Home'
import Product from '../product'
import Catgory from '../category/catgory'
import Role from '../role/role'
import User from '../user/User'
import Pie from '../chart/Pie'
import Line from '../chart/Line'
import Bar from '../chart/Bar'
import Websocket from '../websocket/websocket'
import Organizaton from '../organization/organizaton';
import Resource from '../resource/resource';
import './index.less';

const { Header, Footer, Sider, Content } = Layout;

class Admin extends React.Component{
    
    render(){
        const user=this.props.user; 
        //const user=memoryUtils.user;      
        if(!user||!user.username){
            return <Redirect to='/login'/>;
        }
        return(
            <Layout  style={{color:'#fff',minHeight:'100%'}}>
                <Sider 
                    style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}>
                <LeftNav></LeftNav> 
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <MyHeader />
                    <Content style={{
                            margin: '24px 16px',
                            minWidth:900,
                            // padding: 24,
                            // background: '#fff',
                            overflow: 'initial' 
                    }}>
                         {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/service/user/listPage" component={User}/>
                            <Route path="/service/role/listPage" component={Role}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/category" component={Catgory}/>
                            <Route path="/service/organ/listPage" component={Organizaton}/>
                            <Route path="/service/resource/listPage" component={Resource}/>
                            <Route path="/websocket" component={Websocket}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(state=>state)(Admin)