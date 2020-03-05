/*
 * @Author: your name
 * @Date: 2020-01-09 14:12:33
 * @LastEditTime : 2020-01-10 10:04:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/utils/commonUtils.js
 */
import {message} from 'antd';

export const msg=(data)=>{
    if(data===0){
        message.success('操作成功')
    }else{
        message.error('操作失败')
    }
}

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


export const formatTreeData=(data)=>{
    if (!data) return [];

    let treeData=data.map(item=>{
            let treeItem=[];
            treeItem.title=item.text;
            treeItem.pid=item.parentId;
            treeItem.value=item.id;
            treeItem.id=item.id;
            if(item.children){
                treeItem.children=formatTreeData(item.children)
            }
            return treeItem
            })
    return treeData;
}

export const formItemLayout =(lable,input)=>( {
    labelCol: {
        xs: { span: 24 },
        sm: { span: lable },
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: input },
    },
});