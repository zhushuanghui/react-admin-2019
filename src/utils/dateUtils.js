/*
 * @Author: your name
 * @Date: 2019-12-13 15:51:42
 * @LastEditTime: 2019-12-13 16:25:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/utils/dateUtils.js
 */


export  const dateFormat=(time)=>{
    if(!time) return 

    const Year=time.getFullYear();
    const Month=getNum(time.getMonth()+1);
    const Day=getNum(time.getDate());
    const Hours=getNum(time.getHours());
    const Minutes=getNum(time.getMinutes());
    const Seconds=getNum(time.getSeconds());

    return Year+'年 '+Month+'月 '+Day+'日 '+Hours+':'+Minutes+':'+Seconds
}

function getNum(num){
    return num=num>=10?num:'0'+num;
}