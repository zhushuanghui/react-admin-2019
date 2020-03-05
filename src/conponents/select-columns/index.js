
import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import {
    Menu,
    Dropdown,
    Checkbox,
    Button,
    Icon
} from 'antd'

import './index.less'

export default class SelectColumns extends Component {

    constructor(props){
        super(props);
        this.state={
            visible:false,
            staticColumns:[],
            columns:[],
            disabledIndex:null
        }
    }
    // state={
    //     visible:false,
    //     staticColumns:this.formatCol(this.props.staticColumns),
    //     columns:this.defaultCol(this.props.columns)
    // }

    componentWillReceiveProps (nextProps,nextContext){
        let staticColumns = this.formatCol(nextProps.staticColumns);
        let columns = this.defaultCol(nextProps.columns);
        console.log(nextProps, 'will');
        this.setState({
            staticColumns, columns
        })

    }

    static propTypes={
        columns:PropTypes.array.isRequired
    }

    onChange = (checkedValues) => {
        console.log(checkedValues);
        if(checkedValues.length === 1){
            let staticColumns = this.setDisabled(this.state.staticColumns, checkedValues)
            this.setState({
                staticColumns,
                columns:checkedValues
            })
        }else {
            if(this.state.disabledIndex!==null){
                const {disabledIndex,staticColumns} =this.state
                staticColumns[disabledIndex].disabled=false;
                this.setState({
                    staticColumns:[...staticColumns]
                })
            }
        }
    };

    extra = (staticColumns,columns) => {
        if (!staticColumns) return;
        // staticColumns = this.formatCol(staticColumns);
        // columns = this.defaultCol(columns);
        const menu = (
            <Menu  onClick={this.handleClick}>
                <Menu.Item>
                    <Checkbox.Group 
                    options={staticColumns} 
                    defaultValue={columns} 
                    onChange={this.onChange}/>
                </Menu.Item>
            </Menu>
        );
        
        return menu
    }

    formatCol = (col) => {
        return col.map(item => {
            item.value = item.title;
            item.label = item.title;
            return item
        })
    }

    defaultCol = (col) => {
        return col.map(item =>item.title)
    }

    setDisabled = (staticColumns, checkedValues) =>{
        return staticColumns.map((item,index) => {
            if(item.title === checkedValues[0]) {
                item.disabled=true;
                this.setState({
                    disabledIndex:index
                })
            }
            return item
        })
    }

    cancelDisabled =(staticColumns)=>{
        return staticColumns.map(item => {
                item.disabled=false;
                return item
            })
    }

    getCheckedCol = (staticColumns, columns) => {
        if(staticColumns.length === columns.length) {
            staticColumns = staticColumns.map(item => {
                item.checked=true
                return item
            })
        } else {
            staticColumns = staticColumns.map(item => {
                let flag = columns.some(itm => item.key === itm.key)
                if( flag ){
                    item.checked = true
                } else {
                    item.checked = false
                }

                return item
            })
        }
        return staticColumns
    }

    handleMenuChange = (flag)=> {
        this.setState({
            visible:flag
        })
    }
    
    render() {
        const { columns, handleMenuChange,staticColumns } = this.props;
        console.log(this.state,columns ,'render');
        
        return (
            <Dropdown 
                overlay = { this.extra(this.state.staticColumns,this.state.columns)} 
                placement = "bottomRight"
                trigger = {['click']}
                onVisibleChange = { this.handleMenuChange }
                visible = { this.state.visible }
                >
                <Button>
                <Icon type="appstore" theme="filled" />
                <Icon type="caret-down" theme="filled" />
                </Button>
            </Dropdown>
        )
    }
}
