
import React, { Component } from 'react'
import { Button } from 'antd'

export default class AddButton extends Component {
    render() {
        return (
            <Button type="primary" onClick={()=>this.showFormModal('add',{})}>新增</Button>
        )
    }
}
