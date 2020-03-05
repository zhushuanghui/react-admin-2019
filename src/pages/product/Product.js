/*
 * @Author: your name
 * @Date: 2019-12-12 15:36:48
 * @LastEditTime : 2019-12-27 15:47:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/product/Product.js
 */
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {reqProductList,updateStatus} from '../../api';
import placeHolder from '../../assets/images/logo.png';
import {Select, Table,Modal, Card, Icon, Button,Form ,Input} from 'antd';
import LinkButton from '../../conponents/link-button'
const { Option } = Select;
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


class Product extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            visible:0,//0都不显示 1:add显示  2:update显示
            pageNum:1,
            total:0,
            productList:[]
        }
    }

    initColumns=()=>{
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                render:(name,record)=>(
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img src={record.mainImage?(record.imageHost+record.mainImage):placeHolder}
                        style={{width:100,height:100,marginRight:10}}  alt=''/>
                        <p>{name}</p>     
                    </div>
                )
            },
            // {
            //     title: '商品描述',
            //     dataIndex: 'subtitle',
            // },
            {
                title: '价格',
                dataIndex: 'price',
                filterDropdownVisible:false,
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status, record) => (
                    <span>
                    <Button type="primary" 
                    onClick={()=>this.changeStatus(record)}
                    >{status===1?'上架':'下架'}</Button>
                    <LinkButton >{status===1?'下架':'上架'}</LinkButton>
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text,record) => (
                    <span>
                    <LinkButton onClick={()=>this.props.history.push('/product/detail')}>查看商品</LinkButton>
                    <LinkButton onClick={()=>this.props.history.push('/product/updateyar')}>编辑商品</LinkButton>
                    </span>
                ),
            },
        ];
        this.setState({
        columns
        })
    }

    onChange = checked => {
        this.setState({ loading: !checked });
    };

    getProductList= async(pageNum)=>{
        //不传默认为1
        if(pageNum===this.state.pageNum) return;
        pageNum=pageNum||1;
        let data=await reqProductList(pageNum);
            data=data.data;
        const {total,pages,list,isLastPage}=data;
        this.setState({
            productList:list,
            total,
            pageNum
        })
    }

    changeStatus=async(record)=>{
        let {status,id}=record;
        status=status===1?2:1;
        console.log(record)
        await updateStatus({productId:id,status});
        console.log(id,status);
        this.getProductList();
    }


    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.getProductList()
    }

    render() {
        const { loading,columns,productList,total } = this.state;
        const extra=(<Button  type='primary' onClick={this.showAddModal}>
            <Icon type='plus'></Icon>
            添加
        </Button>);

        let title=(
            <span>  
            <Select defaultValue="lucy" style={{ width: 120,marginRight:10 }} onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Input placeholder="请输入" style={{width:120,marginRight:10}}/>
            <Button type="primary">搜索</Button>
            </span>
        );

        return (
        <div>
            {/* <Switch checked={!loading} onChange={this.onChange} /> */}

            <Card title={title} extra={extra} style={{ width: '100%',height:'100%'}}  loading={loading}>
            <Table columns={columns} 
                dataSource={productList} 
                bordered 
                pagination={{showQuickJumper:true,total,onChange:this.getProductList}}
                rowKey="id"/>
            </Card>

        </div>
        );
    }
}

export default withRouter(Product)
