import React, { Component,Fragment } from 'react'
import {reqResourceList,reqAddResource,reqUpdateResource,reqDelResource,reqChangeLock,reqUpdateRwd,
reqResourceTreeList} from '../../api'
import {Table,Card,Modal,Form,Button,Input,Icon,Row,Col,Tree} from 'antd'
import {msg,formatTreeData} from '../../utils/commonUtils';
import LinkButton from '../../conponents/link-button'
// import SearchFrom from '../../conponents/searchForm'
import SearchFrom from '../../conponents/searchFormLabel'
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

class Resource extends Component {
    state={
        pageNumber:1,
        pageSize:10,
        userList:[],
        columns:[],
        total:0,
        loading:true,
        visible:0,//0 看不见 1:显示新增/修改 2:显示重置密码
        action:'',
        resource:{},
        treeData:[]
    }

    initColumns= () => {
        const columns=[
            {
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
            },
            {
            title: '资源类型',
            dataIndex: 'type',
            key: 'type',
            },
            {
                title: '是否可用',
                dataIndex: 'available',
                key: 'available'
            },
            {
                title: '资源排序',
                dataIndex: 'sort',
                key: 'sort',
                },
            {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                <LinkButton onClick={()=>this.showFormModal('update',record)}>更新</LinkButton>
                <LinkButton onClick={()=>{this.delResource(record);}}>删除</LinkButton>
                </span>
            ),
            },
        ]
        this.setState({columns})
    };

    delResource=(record)=>{
        reqDelResource({'resourceId':record.id}).then((res)=>{
            if(res.status===0){
                this.getResourceList()
            }
            msg=(res.status) 
        })
    }

    getResourceList= async(form,selectTree)=>{
        console.log(form); 
        this.setState({ loading: true });
        const {pageNumber,pageSize}=this.state;
        let values=form?form.getFieldsValue():{};
        selectTree=selectTree?selectTree:{};
        const userData=await reqResourceList({pageNumber,pageSize,...values,...selectTree});
        const {rows:userList,total}=userData.data;
        this.setState({userList,total,loading:false});
    }

    handleTableChange=(page)=>{
        this.setState({pageNumber:page},()=>{
            this.getResourceList();
        })
    }

    showFormModal=(action,resource)=>{
        this.setState({visible:1,action,resource})
    }

    handleOk=(form)=>{
        form.validateFieldsAndScroll({firstFields:true},async (err, values) => {
            if (!err) {
                const {action}=this.state;
                let data;
                values=form.getFieldsValue();
                let {parentId}=values;
                const type = typeof parentId;
                parentId = type === 'string'? parentId: parentId.join(',');
                values = {...values,parentId}
                if(action === 'update'){
                    data = await reqUpdateResource({...values});
                }else if(action === 'add'){
                    data = await reqAddResource({...values})
                }
                if(data.status){
                    this.getResourceList();
                }
                this.handleCancel(form)
                msg(data.status);
            }
        });
    }

    handleCancel=(form)=>{
        this.setState({visible:0})
        form.resetFields();
    }

    //  是否锁定
    confirm=(record)=>{
        let {id,available}=record;
        Modal.confirm({
            title: 'Confirm',
            content: '确定执行此操作吗',
            okText: '确认',
            cancelText: '取消',
            onOk:async()=> {
                await reqChangeLock({userId:id,available:!available})
                this.getResourceList();
            },
            onCancel:()=> {
                console.log('Cancel',this);
            },
        });
    }

    getResourceTreeList= async()=>{
        let data=await reqResourceTreeList();
        data=formatTreeData(data.data);
        this.setState({treeData:data})
    }

    onSelect = (selectedKeys) => {
        const searchparentId=selectedKeys.join(',');
        this.getResourceList(false,{searchparentId})
    };

    renderTreeNodes = data =>
        data.map(item => {
        if (item.children) {
            return (
            <Tree.TreeNode  title={item.title} key={item.id} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </Tree.TreeNode>
            );
        }
        return <Tree.TreeNode key={item.id} {...item} dataRef={item} icon={<Icon type="file" theme="twoTone"/>} isLeaf/>;
    });

    componentDidMount(){
        this.initColumns();
        this.getResourceList();
        this.getResourceTreeList();
    }

    render() {
        const {treeData,columns,userList,pageNumber,pageSize,total,resource,visible,action}=this.state;
        const {getFieldDecorator}=this.props.form;
        const title=(<Button type="primary" onClick={()=>this.showFormModal('add',{})}>新增</Button>);
        const extra=(<Button icon='sync' onClick={()=>{
            this.setState({pageNumber:1},()=>{
                this.handleTableChange(1);
            })
        }}>刷新</Button>);
        return (
            <Row gutter={[16, 16]}>
                <Col span={6} >
                    <Card title='栏目结构树'  type="inner" >
                        <Tree.DirectoryTree 
                        treeData={treeData}
                        onSelect={this.onSelect}
                        switcherIcon={<Icon type="caret-down" theme="filled" style={{color:'#3c8dbc'}}/>}
                        >
                        {this.renderTreeNodes(this.state.treeData)}
                        </Tree.DirectoryTree>
                    </Card>
                </Col>

                <Col span={18}>
                <Card title="条件搜索"  type="inner" style={{marginBottom:20}}>
                    <SearchFrom 
                    type='easy'
                    name={[{name:'resourceName',value:'资源名称'},
                    {name:'resourceType',value:'资源类型'},
                    ]} 
                    search={this.getResourceList}/>
                </Card>
                <Card  title={title} extra={extra} bordered={false}
                // bodyStyle={{padding:0}}
                >
                <Table 
                bordered
                columns={columns} 
                dataSource={userList} 
                rowKey={record => record.id}
                pagination={{pageSize,defaultCurrent:pageNumber,current:pageNumber,total,onChange:this.handleTableChange}}
                loading={this.state.loading}
                />

                {/* 新增 更新 modal  */}
                <FormModal visible={visible}  action={action} handleCancel={this.handleCancel} handleOk={this.handleOk} resource={resource}/>
            </Card>
        </Col>
        </Row>
        )
    }
}

export default  Form.create()(Resource)

