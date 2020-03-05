
import React, { Component } from 'react';
import { Modal, Button,Form,Input } from 'antd';

export class FormModal extends Component {
    render() {
        const {getFieldDecorator}=this.props.form;

        return (
            <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="ID">
                    {
                        getFieldDecorator('id', {
                            rules: [{ required: true, message: '该字段不能为空' }],
                        })(<Input />)
                    }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FormModal);
