/*
 * @Author: your name
 * @Date: 2019-12-12 14:28:57
 * @LastEditTime: 2019-12-12 15:11:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/conponents/left-nav/leftNav.js
 */
import React, { Component } from 'react'
import './LeftNav.less'
import Menu from './Menu'
import logo from '../../assets/images/logo.png'
export class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h3>后台管理系统</h3>                  
                </header>
                <div className="left-nav-menu">
                    <Menu/>
                </div>              
            </div>
        )
    }
}

export default LeftNav
