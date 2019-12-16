/*
 * @Author: your name
 * @Date: 2019-12-12 15:37:18
 * @LastEditTime: 2019-12-16 16:53:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/product/catgory.js
 */
import React from 'react'
import {Divider, Table,Modal, Card, Icon, Button,Form ,Input} from 'antd';
import LinkButton from '../../conponents/link-button'

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


class Catgory extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            visible:0,//0都不显示 1:add显示  2:update显示
            columns:[],
            category:[]
        }
        
        // this.initColumns();
    }
   

    initColumns=()=>{
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width:"70%"
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <LinkButton onClick={this.showUpdateModal}>修改分类</LinkButton>
                    <LinkButton>查看子分类</LinkButton>
                    </span>
                ),
            },
        ];
        this.setState({
        columns
        })
    }


    reqCategory=()=>{
        const category=[
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];

        this.setState({
            category
        })
    }


    onChange = checked => {
        this.setState({ loading: !checked });
    };

    showAddModal = () => {
        this.setState({
            visible: "1",
        });
    };

    handleCancel=()=>{
    this.setState({
        visible: "0",
    });
    }

    showUpdateModal=()=>{
        this.setState({
            visible: "2",
          });
    }

    handleOk=()=>{
        this.setState({
            visible: "0",
          });
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.reqCategory()
    }

    render() {
        const { loading,columns,category } = this.state;
        const extra=(<Button  type='primary' onClick={this.showAddModal}>
            <Icon type='plus'></Icon>
            添加
        </Button>);

        let title='一级分类';

        return (
        <div>
            {/* <Switch checked={!loading} onChange={this.onChange} /> */}

            <Card title={title} extra={extra} style={{ width: '100%',height:'100%'}}  loading={loading}>
            <Table columns={columns} dataSource={category} 
                bordered pagination={{defaultPageSize:2,pageSizeOptions:['1','3','5'],showQuickJumper:true}}
                rowKey="key"/>
            </Card>
            
            <Modal
                title="Add Modal"
                visible={this.state.visible==="1"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                    <Form.Item label="所属分类" >
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item label="分类名称">
                        <Input type="text"/>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal
                title="Update Modal"
                visible={this.state.visible==="2"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
        );
    }
}


export default Catgory
