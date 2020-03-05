
import React, { Component,Fragment } from 'react'
import {reqRoleList,reqAddRole,reqUpdateRole,reqDelRole,reqResourceTreeList,
    reqRoleAll} from '../../api'
import {Table,Card,Modal,Form,Button,Input,TreeSelect, Select} from 'antd'
import {msg,formatTreeData} from '../../utils/commonUtils';
import LinkButton from '../../conponents/link-button'
import SearchFrom from '../../conponents/searchFormLabel'

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

class Role extends Component {
    state={
        pageNumber:1,
        pageSize:10,
        roleList:[],
        columns:[],
        total:0,
        loading:true,
        visible:false,
        action:'',
        role:{},
        resourData:[],
        roleAll:[]
    }

    initColumns= () => {
        const columns=[
            {
            title: 'role',
            dataIndex: 'role',
            key: 'role',
            },
            {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            },
            {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <span>
                <LinkButton onClick={()=>this.showModal('update',record)}>修改</LinkButton>
                
                <LinkButton onClick={()=>{
                    reqDelRole({'roleId':record.id})
                    this.getRoleList()
                    }}>删除</LinkButton>
                </span>
            ),
            },
        ]
        this.setState({columns})
    };

    getRoleList= async(form)=>{
        this.setState({ loading: true });
        const {pageNumber,pageSize}=this.state;
        let values=form?form.getFieldsValue():{};     
        const roleData=await reqRoleList({pageNumber,pageSize,...values});
        if(roleData.status===0){
            const {rows:roleList,total}=roleData.data;
            this.setState({roleList,total,loading:false});
        }
    }

    delRole=(record)=>{
        reqDelRole({'roleId':record.id}).then(res=>{
            if(res.status===0){
                this.getRoleList();
            }
            msg(res.status)
        })
    }

    getResourceTreeList=()=>{
        reqResourceTreeList().then(res=>{
            if(res.status===0){
                this.setState({resourData:formatTreeData(res.data)})
            }
        })
    }

    handleTableChange=(page)=>{
        this.setState({pageNumber:page},()=>{
            this.getRoleList();
        })
    }

    showModal=(action,role)=>{
        this.setState({visible:true,action,role})
    }

    handleOk=()=>{
        this.props.form.validateFields(async (err, values) => {
            let data;
            if (!err) {
                const {action}=this.state;
                let resourceIds=this.props.form.getFieldValue('resourceIds');
                let type=typeof resourceIds;
                resourceIds= type==='string'?resourceIds:resourceIds.join(',');
                values={...values,resourceIds:resourceIds}
                
                if(action==='update'){
                    data= await reqUpdateRole(values);
                }else if(action==='add'){
                    data=await reqAddRole(values)
                }
                if(data.status===0){
                    this.getRoleList();
                }
                this.setState({visible:false})
                this.props.form.resetFields();
                msg(data.status)
            }
        });
    }

    handleCancel=()=>{
        this.setState({visible:false})
        this.props.form.resetFields();
    }

    getRoleAll = async()=>{
        let data = await reqRoleAll();
        if(data.status===0){
            this.setState({
                roleAll:data.data
            })
        }
    }

    componentDidMount(){
        this.initColumns();
        this.getRoleList();
        this.getResourceTreeList()
    }


    render() {
        const title=(<Button type="primary" onClick={()=>this.showModal('add',{})}>新增</Button>);
        const extra=(<Button icon='sync' onClick={()=>{
                    this.setState({pageNumber:1},()=>{
                        this.handleTableChange(1);
                    })
                }}>刷新</Button>);

        const {columns,roleList,pageNumber,pageSize,total,role,action}=this.state;
        const {getFieldDecorator}=this.props.form;
        let {available,resourceIds}=role;
        available=available?available.toString():'0';
        resourceIds=resourceIds?resourceIds.split(','):[];
        return (
            <Fragment>
                <Card title="条件搜索"  type="inner"  style={{marginBottom:20}}>
                    <SearchFrom 
                    name={[{name:'searchrole',value:'用户名'}]}
                    search={this.getRoleList}
                    type='easy'
                    />
                </Card>
                <Card title={title} extra={extra}
                    bordered={false}
                    // bodyStyle={{padding:0}}
                    >
                    <Table 
                        bordered
                        columns={columns} 
                        dataSource={roleList} 
                        rowKey={record => record.id}
                        pagination={{pageSize,defaultCurrent:pageNumber,current:pageNumber,total,onChange:this.handleTableChange}}
                        loading={this.state.loading}
                    />

                    <Modal
                        title={action==='update'?'修改':'新增'}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <Form {...formItemLayout}>
                            {
                                getFieldDecorator('id', {
                                    initialValue:role.id
                                })(<Input type='hidden'/>)
                            }
                            <Form.Item label="角色名称">
                            {
                                getFieldDecorator('role', {
                                    initialValue:role.role,
                                    rules: [{ required: true, message: '该字段不能为空' }],
                                })(<Input placeholder="请选择角色名称"/>)
                            }
                            </Form.Item>
                            <Form.Item label="拥有资源">
                            {
                                getFieldDecorator('resourceIds', {
                                    initialValue:resourceIds,
                                    rules: [{ required: true, message: '该字段不能为空' }],
                                })(<TreeSelect
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={this.state.resourData}
                                    multiple={true}
                                    placeholder="请选择拥有资源"
                                    treeDefaultExpandAll
                                />)
                            }
                            </Form.Item>
                            <Form.Item label="是否可用">
                            {
                                getFieldDecorator('available', {
                                    initialValue:available,
                                    rules: [{ required: true, message: '该字段不能为空' }],
                                })(<Select>
                                    <Select.Option value='1'>可用</Select.Option>
                                    <Select.Option value='0'>不可用</Select.Option>
                                </Select>)
                            }
                            </Form.Item>
                            <Form.Item label="角色描述">
                            {
                                getFieldDecorator('description', {
                                    initialValue:role.description,
                                })(<Input />)
                            }
                            </Form.Item>
                            <Form.Item label="角色类别">
                            {
                                getFieldDecorator('roleIds', {
                                    initialValue:role.type,
                                })(<Select>
                                    <Select.Option value="1">商家</Select.Option>
                                    <Select.Option value="2">运营人员</Select.Option>
                                    <Select.Option value="3">配送人员</Select.Option>
                                    <Select.Option value="4">开发维护人员</Select.Option>
                                    <Select.Option value="5">超级用户</Select.Option>
                                </Select>)
                            }
                            </Form.Item>
                        </Form>
                    </Modal>
            </Card>
        </Fragment>
        )
    }
}

export default  Form.create()(Role)
