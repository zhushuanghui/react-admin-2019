/*
 * @Author: your name
 * @Date: 2020-01-06 09:03:55
 * @LastEditTime : 2020-01-10 15:46:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/user/formModal.js
 */
import React, { Component ,Fragment} from 'react'
import {Modal,Form,Input, Select,TreeSelect} from 'antd'
import {reqRole,reqOrgan,reqCheckName} from '../../api'
import {formatTreeData} from '../../utils/commonUtils'

const {Item}=Form;
const {Option}=Select;
class FormModal extends Component {

    constructor(props){
        super(props)
        this.state={
            roleList:[],
            organTree:[],
            username:''
        }
    }

    getRoleList= async()=>{
        const data=await reqRole();
        this.setState({
            roleList:data.data
        })
    }

    getOrgan=async()=>{
        const data=await reqOrgan();

        const organTree=formatTreeData(data.data)

        this.setState({
            organTree
        })
    }

    checkPassword= (rule, value, callback)=>{
        const password=this.props.form.getFieldValue('password');
        if(value&&value===password){
            return callback();    
        }
        callback('两次输入密码不相符');
    }

    checkName=async(rule, value, callback)=>{
        let username=value?value.trim():'';
        
        if(username&&username===this.state.username) return;
        let data = await reqCheckName({username,userId:''})
        if(data.valid){
            this.setState({username});
            return callback();    
        }
        callback('该用户名已存在');
    }

    componentDidMount(){
        this.getRoleList();
        this.getOrgan();
    }
    

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible,handleCancel,handleOk,user,action} = this.props;
        let {roleIds,organizationId,locked} = user;
        roleIds = roleIds?roleIds.split(','):[];
        organizationId = organizationId ? organizationId.split(','):[];
        locked=locked?locked.toString():'0';
        let title= action === 'update'?'修改用户':'新增用户';
        return (
            <Modal
            title={title}
            width="50%"
            visible={visible===1}
            onOk={()=>handleOk(this.props.form)}
            onCancel={()=>handleCancel(this.props.form)}
            >
                <Form  className="form-modal">
                    {
                        getFieldDecorator('id', {
                        })(<Input type='hidden'/>)
                    }
                    {
                        action==='update'? <Item label="用户名" key='username'>
                        {
                            getFieldDecorator('username',{
                                initialValue:user.username,
                                rules:[
                                    {required:true,message:'用户名不能为空'}
                                ]
                            })(
                                <Input disabled  placeholder='请输入用户名' autoComplete='off'/> 
                            )
                        }
                        </Item>: <Item label="用户名" key='username'>
                    {
                        getFieldDecorator('username',{
                            rules:[
                                {required:true,message:'用户名不能为空'},
                                {validator:this.checkName}
                            ]
                        })(
                            <Input placeholder='请输入用户名' autoComplete='off'/>
                        )
                    }
                    </Item>
                    }      
                    <Item label="真实姓名" key='realName'>
                    {
                        getFieldDecorator('realName',{
                            initialValue:user.realName,
                            rules:[
                                {required:true,message:'真实姓名不能为空'}
                            ]
                        })(
                            <Input placeholder='请输入真实姓名' autoComplete='off'/>
                        )
                    }
                    </Item>
                    {
                        action==='update'?'':(
                            <Fragment>
                            <Item label="用户密码" key='password'>
                                {
                                    getFieldDecorator('password',{
                                        rules:[
                                            {required:true,message:'用户密码不能为空'},
                                            {
                                                pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,18})$/,
                                                message: '请输入8至18位字母与数字组成的用户名',
                                            }
                                        ]
                                    })(
                                        <Input placeholder='请输入密码' autoComplete='off'/>
                                    )
                                }
                                </Item>
                                <Item label="确认密码" key='rpassword' >
                                {
                                      getFieldDecorator('rpassword',{
                                        rules:[
                                            {required:true,message:'确认密码不能为空'},
                                            {validator:this.checkPassword}
                                        ]
                                    })(
                                        <Input placeholder='请确认密码' autoComplete='off'/>
                                    )
                                }
                                </Item>
                            </Fragment>
                        )

                    }
                    <Item label="手机号码" key='mobie'>
                    {
                        getFieldDecorator('mobie',{
                            initialValue:user.mobie,
                            rules:[
                                {required:true,message:'手机号码不能为空'},
                                {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'}
                            ]
                        })(
                            <Input placeholder='请输入手机号码' autoComplete='off'/>
                        )
                    }
                    </Item>
                   
                    
                    <Item label="是否锁定" key='locked'>
                    {
                        getFieldDecorator('locked',{
                            initialValue:locked
                        })(
                            <Select placeholder="是否锁定">
                                <Option value='1'>是</Option>
                                <Option value='0'>否</Option>   
                            </Select>
                        )
                    }
                    </Item>
                   
                    <Item label="所属机构" key='organizationId' className="row">
                    {
                        getFieldDecorator('organizationId',{
                            initialValue:organizationId,
                            rules:[
                                {required:true,message:'所属机构不能为空'}
                            ]
                        })(
                            <TreeSelect
                                style={{ width: '100%' }}
                                // value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={this.state.organTree}
                                multiple={true}
                                placeholder="请选择所属机构"
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            />
                        )
                    }
                    </Item>
                    <Item label="用户角色" key='roleIds' className="row">
                    {
                        getFieldDecorator('roleIds',{
                            initialValue: roleIds
                        })(
                            <Select mode="multiple" placeholder="请选择角色">
                                {
                                    this.state.roleList.map(item=>
                                    <Option value={item.id} key={item.id}>{item.role}</Option>
                                    )
                                }
                            </Select>
                            )
                    }
                    </Item>
                </Form>       
            </Modal>
        )
    }
}

export default Form.create()(FormModal);
