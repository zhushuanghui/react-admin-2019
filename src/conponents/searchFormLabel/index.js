/*
 * @Author: your name
 * @Date: 2020-01-03 10:02:24
 * @LastEditTime : 2020-01-10 09:59:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/conponents/searchFormLabel/index.js
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Button,Row,Col, Select} from 'antd'
import './index.less'

class SearchForm extends Component {
    static propTypes={
        name:PropTypes.array.isRequired
    }


    getFields(name,type) {
        // const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < name.length; i++) {
            let item=name[i];
            if(item.option){
                children.push(
                    <Col span={6} key={item.name}>
                        <Form.Item label={`${item.value}`}>
                            {getFieldDecorator(`${item.name}`)
                            (<Select autoComplete='off'>
                                {
                                    item.option.map( opt =>(
                                        <Select.Option value = { opt.value } key = { opt.value }>{opt.name}</Select.Option>
                                    ))
                                } 
                            </Select>)}
                        </Form.Item>
                    </Col>,
                );
            }else{
                children.push(
                    <Col span={6} key={item.name}>
                        <Form.Item label={`${item.value}`}>
                            {getFieldDecorator(`${item.name}`)(<Input autoComplete='off'/>)}
                        </Form.Item>
                    </Col>,
                );
            }
        }
        if(type==='easy'){
            children.push(<Col span={6} key='search'>
                <Form.Item>
                    <Button type="primary"  htmlType="submit" onClick={()=>this.props.search(this.props.from)}>搜索</Button>
                </Form.Item>
                </Col>,)
        }
        return children;
    }

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() { 
        const {name,search,type}=this.props;
        return(
        <Form className="ant-advanced-search-form" 
            onSubmit={(e)=>{
                e.preventDefault();
                search(this.props.form)
        }}>
        <Row gutter={24}>{this.getFields(name,type)}</Row>
        {
            type==='easy'?'':(
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary"  htmlType="submit" onClick={()=>search(this.props.from)}>
                        Search
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        Clear
                        </Button>
                    </Col>
                </Row>
            )
        }
        
        </Form>
    )
    }
}

export default Form.create()(SearchForm);