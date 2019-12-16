/*
 * @Author: shuang hui
 * @Date: 2019-12-11 16:46:09
 * @LastEditTime: 2019-12-16 09:14:14
 * @LastEditors:双汇
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/api/index.js
 */
import axios from './axios';

//登陆接口
export  const reqLogin=(data)=>axios('/?s=App.User.Login','POST',data)

//添加用户
export const reqAddUser=(user)=>axios('/manager/user/add','POST',user)


//天气
export const reqWeather=(location)=>axios('/?s=App.Common_Weather.LiveWeather','POST',location)
