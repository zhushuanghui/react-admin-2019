/*
 * @Author: your name
 * @Date: 2019-12-11 16:21:59
 * @LastEditTime : 2020-01-16 11:27:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/api/axios.js
 */
import axios from 'axios';
import qs from 'qs';
import memoryUtils from '../utils/memoryUtils';
import storeUtils from '../utils/storeUtils';
import { message } from 'antd';


axios.defaults.headers={'X-Requested-With': 'XMLHttpRequest'}
// const baseUrl='http://192.168.6.118:2224/service';
const baseUrl='';
export default function ajax(url,data = {}, method = 'GET' ) {
    
    url=baseUrl+url;
    
    if(method==='POST'){
        data=qs.stringify(data);
        axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    }
    const Authorization=localStorage.getItem('Authorization');
    if(url!=='/userLogin'){
        axios.defaults.headers.common={'Authorization':Authorization}
    }
    //这样做有助于统一处理错误
    return new Promise((resolve, reject) => {
        let promise;
        if (method === "GET") {
            promise = axios.get(url, {
                params: data
            });
        } else {
            promise = axios.post(url,data);
        }

        promise.then((res)=>{
            //直接拿到内部数据
            if(res.data.status===998){
                storeUtils.removeUser();
                memoryUtils.user={};
                localStorage.removeItem('')
                window.location.href="/login";
                return 
            }
            
            resolve(res.data);
        }).catch(e=>{
            message.error(e.message);
        })
    })
}