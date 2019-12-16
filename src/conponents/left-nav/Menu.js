/*
 * @Author: your name
 * @Date: 2019-12-12 15:07:19
 * @LastEditTime: 2019-12-13 09:59:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/conponents/left-nav/Menu.js
 */

import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

class LeftMenu extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    };

    getMenuNodes=(menuList)=>{
        // defaultOpenKeys='';
        return menuList.map((item)=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>                      
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                const pathname=this.props.location.pathname;
                const cItem=item.children.find((cItem)=>cItem.key===pathname);
                if(cItem){
                    this.openKey=item.key
                }
                return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList);
    }
    // static getDerivedStateFromProps(){
    //     this.menuNodes=this.getMenuNodes(menuList);
    // }


    render() {
        const selectKey=this.props.location.pathname;
        
        return (
            <div style={{ width:'100%' }}>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {
                        this.menuNodes
                    } 
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftMenu);