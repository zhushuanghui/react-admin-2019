/*
 * @Author: your name
 * @Date: 2020-01-20 10:33:29
 * @LastEditTime : 2020-01-20 12:46:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fp-admin/src/app.js
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'

import { decrease, increase} from './redux/action'

class App extends Component {

    constructor(){
        super();
        this.state = {
            count:0
        }
        this.ref = React.createRef();
    }
    

    increase = () =>{
        let value = this.ref.current.state.value;
        value = value*1;
        // this.setState(state =>{
        //     return {count:state.count + value}
        // })
        this.props.increase(value);
    }

    decrease = () =>{
        let value = this.ref.current.state.value;
        value = value*1;
        // this.setState(state =>{
        //     return  {count:state.count - value}
        // })
        this.props.decrease(value);
    }

    render() {
        return (
            <div>
                    <div>数字{this.props.count}</div>
                    <Input  ref = {this.ref} style = {{width:100}}/> 
                    <Button onClick={this.increase} style = {{margin:'0 10px'}}>+</Button>
                    <Button onClick={this.decrease}>-</Button>    
            </div>
        )
    }
}


export default connect(
    state=>({count:state.count}),
    {decrease,increase}
)(App);