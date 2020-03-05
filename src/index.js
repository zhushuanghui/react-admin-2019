/*
 * @Author: your name
 * @Date: 2019-12-10 16:51:56
 * @LastEditTime: 2020-02-18 18:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/index.js
 */
// 入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import storeUtils from './utils/storeUtils';
import memoryUtils from './utils/memoryUtils';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import AppRedux from './App_redux';
// import 'antd/dist/antd.css';

const user=storeUtils.getUser();
memoryUtils.user=user;

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <AppRedux/>
    </ConfigProvider>

,document.getElementById('root'));


