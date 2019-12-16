/*
 * @Author: your name
 * @Date: 2019-12-10 16:51:56
 * @LastEditTime: 2019-12-12 10:56:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/index.js
 */
// 入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import storeUtils from './utils/storeUtils';
import memoryUtils from './utils/memoryUtils';
import App from './App';
// import 'antd/dist/antd.css';

const user=storeUtils.getUser();
memoryUtils.user=user;
console.log(memoryUtils.user)
ReactDOM.render(
<App/>
,document.getElementById('root'));


