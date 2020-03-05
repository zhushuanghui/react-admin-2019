/*
 * @Author: your name
 * @Date: 2019-12-20 14:46:35
 * @LastEditTime : 2019-12-23 18:18:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/category/update-form.js
 */

import React from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types';

const {Item}=Form;


class UpdateForm extends React.Component{

    static propTypes={
        initName:PropTypes.string.isRequired,
        getUpdateFrom:PropTypes.func.isRequired,
    }
    
    componentWillMount(){
        this.props.getUpdateFrom(this.props.form)
    }

    render(){
        const {getFieldDecorator} =this.props.form;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: this.props.initName,
                            rules:[
                                {required:true,message: '不能为空'}
                            ]
                        })(
                            <Input placeholder="请输入新的名称"
                            />
                        )
                    }
                </Item>
            </Form>    
        )
    }
}
// UpdateForm.defaultProps = {
//     rowData:this.props.rowData
// }
// UpdateForm.PropTypes = {
//     rowData:PropTypes.Object.isRequired,
//     // age:PropTypes.number.isRequired,
// }


export default  Form.create()(UpdateForm);
