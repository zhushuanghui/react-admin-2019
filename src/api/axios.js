/*
 * @Author: your name
 * @Date: 2019-12-11 16:21:59
 * @LastEditTime: 2019-12-13 14:41:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/api/axios.js
 */
import axios from 'axios';
import MD5 from 'crypto-js/md5';
import { message } from 'antd';

var  app_key='78A6EA0DE320228163D07B3925C4DAAF';
export default function ajax(url, method = 'GET', data = {}) {
    let {password}=data;
    password=password?MD5(password).words.join("").slice(0,32):null;
    data=password?{...data,password,app_key}:{...data,app_key}
    // data={...data,password,app_key};
    //这样做有助于统一处理错误
    return new Promise((resolve, reject) => {
        let promise;
        if (method === "GET") {
            promise = axios.get(url, {
                params: data
            });
        } else {
            promise = axios.post(url, data);
        }

        promise.then((res)=>{
            //直接拿到内部数据
            resolve(res.data);
        }).catch(e=>{
            message.error('请求出错啦');
        })
    })
}