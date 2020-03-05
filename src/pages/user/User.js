import React, { Component,Fragment } from 'react'
import {reqUserList,reqAddUser,reqUpdateUser,reqDelUser,reqChangeLock,reqUpdateRwd} from '../../api'
import {Table,Card,Modal,Form,Button,Input,Switch} from 'antd'
import {msg} from '../../utils/commonUtils';
import LinkButton from '../../conponents/link-button'
// import SearchFrom from '../../conponents/searchForm'
import SearchFrom from '../../conponents/searchFormLabel'
import './index.less'
import FormModal from './formModal'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

class User extends Component {
    state={
        pageNumber:1,
        pageSize:10,
        userList:[],
        columns:[],
        total:0,
        loading:true,
        visible:0,//0 看不见 1:显示新增/修改 2:显示重置密码
        action:'',
        user:{}
    }

    initColumns= () => {
        const columns=[
            // {
            // title: 'Name',
            // dataIndex: 'name',
            // key: 'name',
            // render: text => <LinkButton>{text}</LinkButton>,
            // },
            {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            },
            {
            title: '真实姓名',
            dataIndex: 'realName',
            key: 'realName',
            },
            {
            title: '电话',
            dataIndex: 'mobie',
            key: 'mobie',
            },
            {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            },
            {
                title: '是否锁定',
                dataIndex: 'locked',
                key: 'locked',
                render:(text,record)=> <Switch checked={text?true:false} onChange={()=>this.confirm(record)} />
                
            },
            {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                <LinkButton onClick={()=>this.showFormModal('update',record)}>更新</LinkButton>
                
                <LinkButton onClick={()=>this.delUser(record) }>删除</LinkButton>
                <LinkButton onClick={()=>this.setState({visible:2})}>重置密码</LinkButton>
                </span>
            ),
            },
        ]
        this.setState({columns})
    };

    getUserList= async(form)=>{
        this.setState({ loading: true });
        const {pageNumber,pageSize}=this.state;
        let values=form?form.getFieldsValue():{name:'444'};
        reqUserList({pageNumber,pageSize,...values}).then(res=>{
            if(res.status===0){
                const {rows:userList,total}=res.data;
                this.setState({userList,total,loading:false});
            }
        });
    }

    delUser=(record)=>{
        reqDelUser({'userId':record.id}).then(res=>{
            if(res.status===0){
                this.getUserList()
            }
            msg(res.status)
        })
    }

    handleTableChange=(page)=>{
        this.setState({pageNumber:page},()=>{
            this.getUserList();
        })
    }

    showFormModal=(action,user)=>{
        this.setState({visible:1,action,user})
    }

    handleOk=(form)=>{
        form.validateFieldsAndScroll({firstFields:true},async (err, values) => {
            if (!err) {
                const {action}=this.state;
                let data;
                values=form.getFieldsValue();
                let {roleIds,organizationId}=values;
                organizationId=organizationId.join(',');
                roleIds=roleIds.join(',');
                values={...values,roleIds,organizationId,id:this.state.user.id}
                if(action==='update'){
                    data = await reqUpdateUser({...values});
                }else if(action==='add'){
                    data = await reqAddUser({...values})
                }
                if(data.status===0){
                    this.getUserList();
                }
                this.handleCancel(form)
                msg(data.status);
            }
        });
    }

    handlePwd=()=>{
        this.props.form.validateFieldsAndScroll({firstFields:true},async (err, values) => {
            if (!err) {
                const data=await reqUpdateRwd(values);
                if(data.status===0){
                    this.getUserList();
                }
                this.handleCancel(this.props.form)
                this.msg(data.status);
            }
        });
        
    }

    handleCancel=(form)=>{
        this.setState({visible:0})
        form.resetFields();
    }

    //  是否锁定
    confirm=(record)=>{
        let {id,locked}=record;
        locked=locked===0?1:0;
        Modal.confirm({
            title: 'Confirm',
            content: '确定执行此操作吗',
            okText: '确认',
            cancelText: '取消',
            onOk:()=> {
                reqChangeLock({userId:id,lock:locked}).then(res=>{
                    if(res.status===0){
                        this.getUserList();
                    }
                    msg(res.status)
                })
            },
            onCancel:()=> {
                console.log('Cancel',this);
            },
        });
    }

    checkPassword= (rule, value, callback)=>{
        const password=this.props.form.getFieldValue('password');
        if(value&&value===password){
            return callback();    
        }
        callback('两次输入密码不相符');
    }


    componentDidMount(){
        this.initColumns();
        this.getUserList();
    }


    render() {
        const {columns,userList,pageNumber,pageSize,total,user,visible,action}=this.state;
        const {getFieldDecorator}=this.props.form;
        const title=(<Button type="primary" onClick={()=>this.showFormModal('add',{})}>新增</Button>);
        const extra=(<Button icon='sync' onClick={()=>{
            this.setState({pageNumber:1},()=>{
                this.handleTableChange(1);
            })
        }}>刷新</Button>);
        return (
            <Fragment>
                <Card title="条件搜索"  type="inner" style={{marginBottom:20}}>
                    <SearchFrom 
                    name={[{name:'id',value:'用户ID'},
                    {name:'organizationId',value:'组织机构ID'},{name:'username',value:'用户名'},{name:'password	',value:'密码'},
                    {name:'salt',value:'salt'},{name:'locked',value:'locked'},{name:'roleIds',value:'角色ID'},{name:'theme',value:'主题'},
                    {name:'organId',value:'organId'}
                    ]} 
                    search={this.getUserList}/>
                </Card>
                <Card title={title} extra={extra} bordered={false}
                >
                <Table 
                bordered
                columns={columns} 
                dataSource={userList} 
                rowKey={record => record.id}
                pagination={{pageSize,defaultCurrent:pageNumber,current:pageNumber,total,onChange:this.handleTableChange}}
                loading={this.state.loading}
                />
                {/* 更新密码 */}
                <Modal
                    title="重置密码"
                    visible={this.state.visible===2}
                    onOk={this.handlePwd}
                    onCancel={()=>this.handleCancel(this.props.form)}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="原密码">
                        {
                            getFieldDecorator('oldPassword', {
                                rules: [
                                    {required:true,message:'用户密码不能为空'},
                                    {
                                        pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,18})$/,
                                        message: '请输入8至18位字母与数字组成的用户名',
                                    }
                                ],
                            })(<Input autoComplete='off'/>)
                        }
                        </Form.Item>
                        <Form.Item label="新密码">
                        {
                            getFieldDecorator('newPassword', {
                                rules: [
                                    { required: true, message: '请输入新密码'},
                                    {
                                        pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,18})$/,
                                        message: '请输入8至18位字母与数字组成的用户名',
                                    }],
                            })(<Input autoComplete='off'/>)
                        }
                        </Form.Item>
                        <Form.Item label="确认密码">
                        {
                            getFieldDecorator('newPassword2', {
                                rules: [
                                {required: true, message: '请确认新密码' },
                                {validator:this.checkPassword}],
                            })(<Input autoComplete='off'/>)
                        }
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 新增 更新 modal  */}
                <FormModal visible={visible}  action={action} handleCancel={this.handleCancel} handleOk={this.handleOk} user={user}/>
            </Card>
        
        </Fragment>
        )
    }
}

export default  Form.create()(User)

