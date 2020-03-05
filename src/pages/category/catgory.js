/*
 * @Author: your name
 * @Date: 2019-12-12 15:37:18
 * @LastEditTime : 2019-12-27 14:32:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/product/catgory.js
 */
import React from 'react'
import {reqCategory,addCategory,updateCategoryName} from '../../api'
import {Select, Table,Modal, Card, Icon, Button,Form ,Input} from 'antd';
import LinkButton from '../../conponents/link-button'
import UpdateForm from './update-form';
const { Option }=Select

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
            loading: true,
            visible:0,//0都不显示 1:add显示  2:update显示
            categoryId:0,
            columns:[],
            category:[],
            subCategory:[],
            updateCurCatg:{}
        }
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
                render: (text)=> (
                    <span>
                    <LinkButton onClick={()=>this.showUpdateModal(text)}>修改分类</LinkButton>
                    <LinkButton onClick={()=>this.showSubCategory(text.id)}>查看子分类</LinkButton>
                    </span>
                ),
            },
        ];
        this.setState({
        columns
        })
    }

    getCategoryInfo= async(categoryId)=>{
        //categoryId不传时默认获得所有分类
        const data=await reqCategory(this.state.categoryId);
        console.log(data);
        const category=data.data;
        if(!this.state.categoryId){
            this.setState({
                category,loading:false
            })
        }else{
            this.setState({
                subCategory:category,loading:false
            })
        }
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
    this.form.resetFields()
    }

    handleOk= (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                addCategory(values);
                this.setState({
                    visible: "0",
                });
                //如果在当前分类下添加分类 需要重新请求该分类
                console.log(values.parentId,this.state.categoryId)
                if(values.parentId==this.state.categoryId){
                    this.getCategoryInfo(this.state.categoryId);
                }
                console.log('Received values of form: ', values);
            }
        });
    }

    showUpdateModal=(text)=>{
        this.setState({
            visible: "2",
            updateCurCatg:text
        });
        // console.log(text,'update')
    }

    getUpdateFrom=(form)=>{
        this.form=form;
    }

    handleUpdateOk=()=>{
        this.form.validateFields((err,values)=>{
            if(!err){
                const {id}=this.state.updateCurCatg;
                
                updateCategoryName({categoryId:id,...values});
                this.setState({
                    visible:"0"
                })
                this.getCategoryInfo(this.state.categoryId);
            }
            this.form.resetFields()
        })
    }


    showSubCategory=(categoryId)=>{
        this.setState({
            categoryId
        },()=>{
            this.getCategoryInfo(categoryId)
        })
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount (){   
        this.getCategoryInfo()
    }

    render() {
        const  { loading,columns,category,categoryId,subCategory } = this.state;
        const dataSource=categoryId===0?category:subCategory;
        const { getFieldDecorator } = this.props.form
        const extra=(<Button  type='primary' onClick={this.showAddModal}>
            <Icon type='plus'></Icon>
            添加
        </Button>);
        let title='一级分类';

        return (
        <div>
            {/* <Switch checked={!loading} onChange={this.onChange} /> */}
            <Card title={title} extra={extra} style={{ width: '100%',height:'80%'}}  >
            <Table columns={columns} dataSource={dataSource} 
                loading={loading}
                bordered pagination={{defaultPageSize:10,pageSizeOptions:['1','3','5'],showQuickJumper:true}}
                rowKey="id"/>
            </Card>
            
            <Modal
                title="Add Modal"
                visible={this.state.visible==="1"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                    <Form.Item label="所属品类" >                       
                        {
                            getFieldDecorator('parentId',{
                                rules:[
                                    {required:true}
                                ]
                            })(
                                <Select>
                                <Option value="0">一级分类</Option>
                                {
                                    category.map(cItem=><Option value={cItem.id} key={cItem.id}>一级分类/+{cItem.name}</Option>)
                                }
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="品类名称">
                        {
                            getFieldDecorator('categoryName',{
                                rules:[
                                    {required:true}
                                ]
                            })(<Input type="text"/>)
                        }
                    </Form.Item>
                </Form>
            </Modal>


            <Modal
                title="Update Modal"
                visible={this.state.visible==="2"}
                onOk={this.handleUpdateOk}
                onCancel={this.handleCancel}
                >
                <UpdateForm  initName={this.state.updateCurCatg.name} getUpdateFrom={this.getUpdateFrom}/>
            </Modal>
        </div>
        );
    }
}


export default Form.create()(Catgory)
