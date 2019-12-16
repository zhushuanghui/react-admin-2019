/*
 * @Author: your name
 * @Date: 2019-12-10 18:00:26
 * @LastEditTime: 2019-12-12 11:02:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/login/Login.js
 */

import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
import { reqLogin } from '../../api';
import logo from '../../assets/images/logo.png';
import './login.less';
import  memoryUtils from '../../utils/memoryUtils';
import  storeUtils from '../../utils/storeUtils';

class Login extends React.Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        // const form=this.props.form;
        // const value=form.getFieldsValue();
        // console.log(value,'----')
        this.props.form.validateFields((err, values) => {
            if (!err) {               
                console.log('Received values of form: ', values);
                reqLogin(values).then((data)=>{
                    memoryUtils.user=values;
                    storeUtils.setUser(values);
                    // if(data.status=="0"){
                        this.props.history.replace('/');
                    // }
                })
            }else{
                alert('校验失败')
            }
        });
    }

    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码不能为空')
        }else if(value.length<4){
            callback('密码至少4位数')
        }else{
            callback();
        }

    }

    render(){
        const user=memoryUtils.user;
        if(user.username){
            return <Redirect to="/"/>
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React 项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!' },
                                    {min:4,message:'用户名至少四位'},
                                    {max:12,message:'用户名最多12位数'},
                                    {pattern:/^[a-zA-Z0-9_]{1,}$/,message:'必须是由数字、字母、或下划线组成'}
                                ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />
                       )} 
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[{validator:this.validatePwd}]
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)} */}
                            {/* <a className="login-form-forgot" href="/">
                                Forgot password
                            </a> */}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin;