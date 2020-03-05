import React, { Component,Fragment } from 'react'
import {reqOrganList, reqAddOrgan, reqUpdateOrgan, reqDelOrgan,reqUpdateRwd,
reqOrganTreeList} from '../../api'
import {Table,Card,List,Form,Button,Checkbox,Icon,Row,Col,Tree,Dropdown,Menu, Select} from 'antd'
import {msg,formatTreeData} from '../../utils/commonUtils';
import LinkButton from '../../conponents/link-button'
import SearchFrom from '../../conponents/searchFormLabel'
import FormModal from './formModal'
import SelectColumns from '../../conponents/select-columns'


const ButtonGroup = Button.Group;
class Organization extends Component {
    state={
        pageNumber:1,
        pageSize:10,
        userList:[],
        columns:[],
        staticColumns:[],
        total:0,
        loading:true,
        visible:0,//0 看不见 1:显示新增/修改 2:显示重置密码
        action:'',
        organ:{},
        treeData:[]
    }

    initColumns= () => {
        const columns=[
            {
            title: '机构名称',
            dataIndex: 'name',
            key: 'name'
            },
            {
            title: '法人',
            dataIndex: 'legalPerson',
            key: 'legalPerson'
            },
            {
            title: '机构地址',
            dataIndex: 'address',
            key: 'address'
            },
            {
            title: '机构电话',
            dataIndex: 'telNo',
            key: 'telNo',
            },
            {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            },
            {
            title: '父机构名称',
            dataIndex: 'parentName',
            key: 'parentName',
            },
            {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                <LinkButton onClick={()=>this.showFormModal('update',record)}>更新</LinkButton>
                <LinkButton onClick={()=>{this.delResource(record);}}>注销</LinkButton>
                </span>
            ),
            },
        ]
        this.setState({columns,staticColumns:Object.assign([],columns)})
    };

    delResource=(record)=>{
        reqDelOrgan({'organizationId':record.id}).then((res)=>{
            if(res.status===0){
                this.getOrganList()
            }
        msg(res.status) 
        })
    }

    getOrganList= async(form,selectTree)=>{
        console.log(form); 
        this.setState({ loading: true });
        const {pageNumber,pageSize}=this.state;
        let values=form?form.getFieldsValue():{};
        selectTree=selectTree?selectTree:{};
        const userData=await reqOrganList({pageNumber,pageSize,...values,...selectTree});
        const {rows:userList,total}=userData.data;
        this.setState({userList,total,loading:false});
    }

    handleTableChange=(page)=>{
        this.setState({pageNumber:page},()=>{
            this.getOrganList();
        })
    }

    showFormModal=(action,organ)=>{
        this.setState({visible:1,action,organ})
    }

    handleOk=(form)=>{
        form.validateFieldsAndScroll({firstFields:true},async (err, values) => {
            if (!err) {
                const {action}=this.state;
                let data;
                // values=form.getFieldsValue();
                let  { parentId } = values;
                let startDate = form.getFieldValue('startDate');
                startDate = startDate ? startDate.format('YYYY-MM-DD') : '';
                let endDate = form.getFieldValue('endDate');
                endDate = endDate ? endDate.format('YYYY-MM-DD') : '';
                console.log(startDate, endDate, parentId,values);
                const type = typeof parentId;
                parentId = type === 'string'? parentId: parentId.join(',');
                values = { ...values, startDate, endDate, parentId };
                if(action === 'update'){
                    data = await  reqUpdateOrgan({...values});
                }else if(action === 'add'){
                    data = await  reqAddOrgan({...values})
                }
                if(data.status){
                    this.getOrganList();
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

    getOrganTreeList= async()=>{
        let data=await  reqOrganTreeList();
        data=formatTreeData(data.data);
        this.setState({treeData:data})
    }

    onSelect = (selectedKeys) => {
        const searchparentId=selectedKeys.join(',');
        this.getOrganList(false,{searchparentId})
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

    handleColChange = (col) => {
        console.log(col,'fff');
        this.setState({ columns: col });
    };

    componentDidMount(){
        this.initColumns();
        this.getOrganList();
        this.getOrganTreeList();
    }

    render() {
        const {treeData,columns,staticColumns,userList,pageNumber,pageSize,total,organ,visible,action}=this.state;
        const title=(<Button type="primary" onClick={()=>this.showFormModal('add',{})}>新增</Button>);
        const extra=(<ButtonGroup><Button icon='sync' onClick={()=>{
            this.setState({pageNumber:1},()=>{
                this.handleTableChange(1);
            })}}>刷新</Button>
            <SelectColumns columns={columns} staticColumns={staticColumns}/>
            </ButtonGroup>);
        return (
            <Row gutter={[16, 16]}>
                <Col span={6} className='col-tree'>
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
                    name={[{name:'name',value:'机构名称'},
                    {name:'available',value:'是否有效',option:[{value:'1',name:'可用'},{value:'2',name:'不可用'}]},
                    ]} 
                    search={this.getOrganList}/>
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
                <FormModal visible={visible}  action={action} handleCancel={this.handleCancel} handleOk={this.handleOk} organ={organ}/>
            </Card>
        </Col>
        </Row>
        )
    }
}

export default  Form.create()(Organization)


