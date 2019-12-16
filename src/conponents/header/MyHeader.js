/*
 * @Author: your name
 * @Date: 2019-12-12 14:25:12
 * @LastEditTime: 2019-12-16 10:51:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/conponents/header/MyHeader.js
 */

import React, { Component } from 'react'
import { Modal } from 'antd';
import {withRouter} from 'react-router-dom'
// import PubSub from 'pubsub-js' 
import {reqWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storeUtils from '../../utils/storeUtils'
import {dateFormat} from '../../utils/dateUtils'
 import menuList from '../../config/menuConfig'
import LinkButton from '../link-button/index'
import './index.less'

const { confirm } = Modal;

class MyHeader extends Component {
    state={
        currentTime:dateFormat(new Date()),
    }

    getWheather=(city)=>{

        reqWeather(city).then(res=>{
            if(res.err_code==='0'){
                const {weather}=res.weather;
                return weather;
            }
            return '晴天'          
        });
    }

    handleClick=()=>{
        confirm({
            // title: 'Do you Want to exit?',
            content: 'Do you Want to exit',
            onOk:()=> {
                storeUtils.removeUser();
                memoryUtils.user={};
                this.props.history.replace("/login");
            },
            });
   
    }

    getCurrentTime=()=>{
        this.timer=setInterval(()=>{
            let currentTime=dateFormat(new Date());
            this.setState({
                currentTime
            })
            // clearInterval(this.timer)
        },1000)
    }

    getMenuItem=(menu,pathname)=>{
        let menuItem;
        menu.forEach((item)=>{
            console.log(item)
            if(!item.children){
                if(item.key===pathname) {
                    console.log(item)
                    menuItem=item
                }
            }else{
                // this.getMenuItem(item.children,pathname)
                menuItem=item.children.find(item=>item.key===pathname)
            }
        })  
        return menuItem
    }
    
    componentDidMount(){        
        const weather = this.getWheather({city:"北京"});      
        this.getCurrentTime();     
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        
        const {username}=memoryUtils.user
        const {pathname}=this.props.location; 
        // const menuItem=this.getMenuItem(menuList,pathname);
        // console.log(menuItem);
        // // if(this.state.path!==pathname){           
        //     const menuItem=this.getMenuItem(menuList,pathname);
        //     console.log(menuItem)
        // }           
        return (
            <div className="my-header">
                <div className="top-header">
                <span>欢迎，{username}</span>
                <LinkButton onClick={this.handleClick}>退出</LinkButton>
                </div>

                <div className="bottom-header">
                <div className="bottom-header-left">shouye</div>
                    <div className="bottom-header-right">
                    <span>{this.state.currentTime}</span>
                        <span>☀️ 晴天</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader);
