/*
 * @Author: your name
 * @Date: 2019-12-10 11:19:04
 * @LastEditTime: 2019-12-10 15:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/demo/life.js
 */
import React from 'react';

class Child extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:this.props.counter
        }
    }

    // componentWillMount(){
    //     console.log('willMount');      
    // }

    componentDidMount(){
        console.log('componentDidMount!!!!!');      
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');      
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');      
    }

    componentWillUnmount(){
        console.log('componentWillUnmount'); 
    }


    render(){
        console.log('render=====')
       return(
           <div>
               <h2>this is child component</h2>
               <p>{this.props.counter}</p>
               <p>name:{this.state.name}</p>
           </div>
       ) 
    }
}

export default class Life extends React.Component{ 
    constructor(){
        super();
        this.state={
            count:0
        }
    }
    componentDidMount(){
         this.setState({
             count:this.state.count+1
         })
        console.log('componentDidMount------');      
    }
    handleClick=()=>{
      //console.log(this)
      this.setState({
          count:this.state.count+1
      })
    }

    render(){
        console.log('render!!!!!'); 
        return (
            <div>
                <h1>React 生命周期</h1>
                <button onClick={this.handleClick}>clik</button>
                <p>{this.state.count}</p>
                <Child counter={this.state.count}/>
            </div>
        )
    }
}