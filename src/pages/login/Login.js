/*
 * @Author: your name
 * @Date: 2019-12-10 18:00:26
 * @LastEditTime : 2020-01-15 08:59:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/login/Login.js
 */

import React from 'react';
import { Form, Icon, Input, Button, message,Row,Col } from 'antd';
import { Redirect } from 'react-router-dom';
import { reqLogin,reqVerifyCode} from '../../api';
import logo from '../../assets/images/logo.png';
import './login.less';
import  memoryUtils from '../../utils/memoryUtils';
import  storeUtils from '../../utils/storeUtils';

class Login extends React.Component{
    state={
        loading:false
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {  
                this.setState({loading:true})             
                console.log('Received values of form: ', values);


                // memoryUtils.user=values;
                // storeUtils.setUser(values);
                // this.props.history.replace('/');      

                reqLogin(values).then((data)=>{   
                    if(data.status===0){
                        const Authorization=data.data.Authorization
                        memoryUtils.user=values;
                        storeUtils.setUser(values);
                        localStorage.setItem('Authorization',Authorization);
                        this.props.history.replace('/');
                    }else{
                        this.setState({loading:false}) 
                        message.warning(data.message)
                    }
                })
            }else{
                this.setState({loading:false})
                alert('校验失败')
            }
        });
    }

    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码不能为空')
        }else{
            callback();
        }
    }

    getVerifyCode= async()=>{
        const data=this.props.form.getFieldsValue(['username','password','telNo']);
        let verifyCode=await reqVerifyCode(data);
        console.log(data,verifyCode);  
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
                    <Form onSubmit={this.handleSubmit} className="login-form" encType="multipart/form-data">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名' },
                                    {pattern:/^[a-zA-Z0-9_]{1,}$/,message:'必须是由数字、字母、或下划线组成'}
                                ],
                        })(
                            <Input
                            prefix={<Icon type="user" className="iconfont"/>}
                            placeholder="username"
                            />
                        )} 
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[{validator:this.validatePwd}]
                                })(
                                    <Input.Password 
                                    prefix={<Icon type="lock" className="iconfont"/>}
                                    type="password"
                                    placeholder="Password"/>
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item>
                            {
                                getFieldDecorator('telNo',{
                                    rules:[{required: true, message: '请输入手机号码' },
                                    {len:11},
                                    // {pattern:/^[1]{1}(\d){10}$/,message:'请输入正确格式的手机号码'}
                                ]
                                })(
                                    <Input
                                    prefix={<i className="iconfont icon-phone_icon" />}
                                    placeholder="请输入手机号码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                {
                                    getFieldDecorator('yzm',{
                                        rules:[{required: true, message: '请输入验证码' }
                                    ]
                                    })(
                                        
                                        <Input
                                        prefix={<i className="iconfont icon-yanzhengma3" />}
                                        />
                                    )
                                } 
                                </Col>
                                <Col span={12}>
                                <Button onClick={this.getVerifyCode}>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                                Log in
                            </Button>
                            {/* Or <a href="/">register now!</a> */}
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin;