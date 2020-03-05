
import React, { Component ,Fragment } from 'react'
import { Modal, Form, Input, Select, TreeSelect, DatePicker } from 'antd'
import { reqRole, reqOrgan, reqOrganTreeList} from '../../api'
import { formItemLayout, formatTreeData } from '../../utils/commonUtils'

const { Item } = Form;
const { Option } = Select;
class FormModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            organData:[],
            username:''
        }
    }

    getOrganTree = async () => {
        const data = await reqOrganTreeList();
        const organData = formatTreeData(data.data)

        this.setState({
            organData
        })
    }


    componentDidMount() {
        this.getOrganTree();
    }
    

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible,handleCancel,handleOk,organ,action} = this.props;
        let {parentId,available} = organ;
        parentId = parentId ? parentId.split(','):[];
        available=available==undefined?'':available.toString();
        let title = action === 'update' ? '修改' : '新增';
        return (
            <Modal
            title={title}
            width='60%'
            visible={visible===1}
            onOk={()=>handleOk(this.props.form)}
            onCancel={()=>handleCancel(this.props.form)}
            >
                <Form {...formItemLayout(4,20)} className = 'form-modal'>
                    {
                        getFieldDecorator('id',{
                            initialValue:organ.id,
                        })(<Input type='hidden'/>)
                    }
                    <Item label="资源名称" key='name'>
                    {
                        getFieldDecorator('name',{
                            initialValue:organ.name,
                            rules:[
                                {required:true,message:'资源名称不能为空'}
                            ]
                        })(
                            <Input placeholder='请输入资源名称' autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="是否有效" key='available'>
                    {
                        getFieldDecorator('available',{
                            initialValue:available
                        })(
                            <Select>
                                <Option value='1'>有效</Option>
                                <Option value='0'>无效</Option>   
                            </Select>
                        )
                    }
                    </Item>
                    <Item label="机构类别" key='type'>
                    {
                        getFieldDecorator('type',{
                            initialValue:organ.type,
                            rules:[
                                {required:true,message:'机构类别不能为空'}
                            ]
                        })(
                            <Select>
                                <Select.Option key = '1' value='1'>商户</Select.Option>
                                <Select.Option key = '2' value='2'>运营机构</Select.Option>
                                <Select.Option key = '4' value='3'>配送机构</Select.Option>
                                <Select.Option key = '4' value='4'>开发维护机构</Select.Option>
                            </Select>
                        )
                    }
                    </Item>
                    <Item label="机构简称" key='shortName' >
                    {
                        getFieldDecorator('shortName',{
                            initialValue:organ.shortName,
                            rules:[
                                {required:true,message:'所属机构不能为空'}
                            ]
                        })(<Input placeholder='请输入资源路径'/>
                        )
                    }
                    </Item>
                    <Item label="商户类型" key='companyType'>
                    {
                        getFieldDecorator('companyType',{
                            initialValue:organ.companyType,
                            rules:[
                                {required:true,message:'商户类型不能为空'}
                            ]
                        })(
                            <Select>
                                {/* <Select.Option value=''>全选</Select.Option> */}
                                <Select.Option value='menu'>普通商户</Select.Option>
                                <Select.Option value='menus'>扶贫商户</Select.Option>
                                <Select.Option value='button'>特产商户</Select.Option>
                            </Select>
                        )
                    }
                    </Item>
                    <Item label="开票方" key='invoiceFrom' >
                    {
                        getFieldDecorator('invoiceFrom',{
                            initialValue:organ.invoiceFrom,
                            rules:[
                                {required:true,message:'开票方不能为空'}
                            ]
                        })(  <Select>
                            <Select.Option value='2'>商户开票</Select.Option>
                        </Select>
                        )
                    }
                    </Item>
                    <Item label="机构法人" key='legalPerson' >
                    {
                        getFieldDecorator('legalPerson',{
                            initialValue:organ.legalPerson,
                            rules:[
                                {required:true,message:'所属机构不能为空'}
                            ]
                        })(<Input placeholder='请输入资源路径'/>
                        )
                    }
                    </Item>
                    <Item label="机构电话" key='telNo' >
                    {
                        getFieldDecorator('telNo',{
                            initialValue: organ.telNo,
                            rules:[
                                {required:true,message:'排序不能为空'}
                            ]
                        })(<Input placeholder='排序'/>)
                    }
                    </Item>
                    <Item label="机构邮箱" key='email' >
                    {
                        getFieldDecorator('email',{
                            initialValue: organ.email,
                            rules:[
                                {required:true,message:'排序不能为空'}
                            ]
                        })(<Input placeholder='排序'/>)
                    }
                    </Item>
                    <Item label="机构传真" key='fax' >
                    {
                        getFieldDecorator('fax',{
                            initialValue: organ.fax,
                            rules:[
                                {required:true,message:'排序不能为空'}
                            ]
                        })(<Input placeholder='排序'/>)
                    }
                    </Item>
                    <Item label="有效日期" key='startDate'>
                    {
                        getFieldDecorator('startDate',{
                            initialValue:organ.startDate
                        })(
                            <DatePicker  autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="终止日期" key='endDate'>
                    {
                        getFieldDecorator('endDate',{
                            initialValue:organ.endDate
                        })(
                            <DatePicker  autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="机构地址" key='address'>
                    {
                        getFieldDecorator('address',{
                            initialValue:organ.address,
                            rules:[
                                {required:true,message:'排序不能为空'}
                            ]
                        })(
                            <Input placeholder='请输入权限字符' autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="机构描述" key='desc'>
                    {
                        getFieldDecorator('desc',{
                            initialValue:organ.desc
                        })(
                            <Input placeholder='请输入权限字符' autoComplete='off'/>
                        )
                    }
                    </Item>
                    <Item label="所属机构" key='parentId' className="row"> 
                    {
                        getFieldDecorator('parentId',{
                            initialValue: organ.parentId,
                            rules:[
                                {required:true,message:'上级资源不能为空'}
                            ]
                        })(<TreeSelect
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.state.organData}
                            multiple={true}
                            placeholder="请选择上级资源"
                            treeDefaultExpandAll
                        />)
                    }
                    </Item>
                </Form>       
            </Modal>
        )
    }
}

export default Form.create()(FormModal);
