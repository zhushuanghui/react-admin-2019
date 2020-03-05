
import React, { Component ,Fragment} from 'react'
import {Modal,Form,Input, Select,TreeSelect} from 'antd'
import {reqRole,reqOrgan,reqResourceTreeList} from '../../api'
import {formItemLayout,formatTreeData} from '../../utils/commonUtils'

const {Item}=Form;
const {Option}=Select;
class FormModal extends Component {
    constructor(props){
        super(props)
        this.state={
            resourData:[],
            username:''
        }
    }

    getResourceTree=async()=>{
        const data=await reqResourceTreeList();
        const resourData=formatTreeData(data.data)

        this.setState({
            resourData
        })
    }


    componentDidMount(){
        this.getResourceTree();
    }
    

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible,handleCancel,handleOk,resource,action} = this.props;
        let {parentId,available} = resource;
        parentId = parentId ? parentId.split(','):[];
        available=available===undefined?'':available.toString();
        let title= action === 'update'?'修改':'新增';
        return (
            <Modal
            title={title}
            visible={visible===1}
            onOk={()=>handleOk(this.props.form)}
            onCancel={()=>handleCancel(this.props.form)}
            >
                <Form {...formItemLayout(4,20)}>
                    {
                        getFieldDecorator('id',{
                            initialValue:resource.id,
                        })(<Input type='hidden'/>)
                    }
                    <Item label="资源名称" key='name'>
                    {
                        getFieldDecorator('name',{
                            initialValue:resource.name,
                            rules:[
                                {required:true,message:'资源名称不能为空'}
                            ]
                        })(
                            <Input placeholder='请输入资源名称' autoComplete='off'/>
                        )
                    }
                    </Item>
                   
                    <Item label="资源路径" key='url' >
                    {
                        getFieldDecorator('url',{
                            initialValue:resource.url,
                            rules:[
                                {required:true,message:'所属机构不能为空'}
                            ]
                        })(<Input placeholder='请输入资源路径'/>
                        )
                    }
                    </Item>
                    <Item label="资源排序" key='sort' >
                    {
                        getFieldDecorator('sort',{
                            initialValue: resource.sort,
                            rules:[
                                {required:true,message:'排序不能为空'}
                            ]
                        })(<Input placeholder='排序'/>)
                    }
                    </Item>
                    <Item label="上级资源" key='parentId'> 
                    {
                        getFieldDecorator('parentId',{
                            initialValue: resource.parentId,
                            rules:[
                                {required:true,message:'上级资源不能为空'}
                            ]
                        })(<TreeSelect
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.state.resourData}
                            multiple={true}
                            placeholder="请选择上级资源"
                            treeDefaultExpandAll
                        />)
                    }
                    </Item>
                    
                    <Item label="资源类型" key='type'>
                    {
                        getFieldDecorator('type',{
                            initialValue:resource.type,
                        })(
                            <Select>
                                <Select.Option value=''>全选</Select.Option>
                                <Select.Option value='menu'>菜单项</Select.Option>
                                <Select.Option value='menus'>菜单集</Select.Option>
                                <Select.Option value='button'>按钮</Select.Option>
                            </Select>
                        )
                    }
                    </Item>
                    <Item label="是否启用" key='available'>
                    {
                        getFieldDecorator('available',{
                            initialValue:available
                        })(
                            <Select placeholder="是否启用">
                                <Option value='true'>是</Option>
                                <Option value='false'>否</Option>   
                            </Select>
                        )
                    }
                    </Item>
                    <Item label="权限字符" key='permission'>
                    {
                        getFieldDecorator('permission',{
                            initialValue:resource.permission
                        })(
                            <Input placeholder='请输入权限字符' autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="资源图标" key='icon'>
                    {
                        getFieldDecorator('icon',{
                            initialValue:resource.icon
                        })(
                            <Input placeholder='图标' autoComplete='off'/>
                        )
                    }
                    </Item>
                    
                </Form>       
            </Modal>
        )
    }
}

export default Form.create()(FormModal);
