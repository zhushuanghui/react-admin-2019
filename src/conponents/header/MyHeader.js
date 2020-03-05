
import React, { Component } from 'react'
import { Modal,Avatar,Icon,Dropdown,Menu,Upload } from 'antd';
import {withRouter} from 'react-router-dom'
// import PubSub from 'pubsub-js'
import memoryUtils from '../../utils/memoryUtils'
import storeUtils from '../../utils/storeUtils'
import LinkButton from '../link-button/index'
import './index.less'

const { confirm } = Modal;
const { Item } = Menu
class MyHeader extends Component {

    state = {
        collapsed: false,
        isFullScreen: false,
        previewVisible: false,
        previewImage: '',
        file:{},
        avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };

        
    fullScreen = () => {
        if (!this.state.isFullScreen) {
            this.requestFullScreen();
        } else {
            this.exitFullscreen();
        }
    };
    
    //进入全屏
    requestFullScreen = () => {
        var de = document.documentElement;
        if (de.requestFullscreen) {
        de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
        }
    };
    
    //退出全屏
    exitFullscreen = () => {
        let de = document;
        if (de.exitFullscreen) {
        de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
        }
    };
    
    //监听fullscreenchange事件
    watchFullScreen = () => {
        const _self = this;
        
        document.addEventListener(
            "fullscreenchange",
            function() {
                _self.setState({
                    isFullScreen: document.fullscreen
                });
                },
            false
        );
        document.addEventListener(
        "webkitfullscreenchange",
        function() {
            _self.setState({
                isFullScreen: document.webkitIsFullScreen
            });
        },
        false
        );
        document.addEventListener(
            "mozfullscreenchange",
            function() {
                _self.setState({
                    isFullScreen: document.mozFullScreen
                });
            },
            false
        );
    };
    
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    exit=()=>{
        confirm({
            // title: 'Do you Want to exit?',
            content: 'Do you Want to exit',
            onOk:()=> {
                storeUtils.removeUser();
                memoryUtils.user={};
                this.props.history.replace("/login");
            },
            });
    }

    // getMenuItem=(menu,pathname)=>{
    //     let menuItem;
    //     menu.forEach((item)=>{
    //         console.log(item)
    //         if(!item.children){
    //             if(item.key===pathname) {
    //                 console.log(item)
    //                 menuItem=item
    //             }
    //         }else{
    //             // this.getMenuItem(item.children,pathname)
    //             menuItem=item.children.find(item=>item.key===pathname)
    //         }
    //     })  
    //     return menuItem
    // }


    getBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleCancel = () => this.setState({ previewVisible: false });

    // handlePreview = async file => {
    //     if (!file.url && !file.preview) {
    //     file.preview = await this.getBase64(file.originFileObj);
    //     }

    //     this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     });
    // };


    handleChange = ({ file, fileList }) => {

        if(file.status === 'done') {
            console.log(file,'file',fileList);
            
        } else if (file.status === 'removed'){
            console.log('delette');
            
        }
    }

    componentDidMount = () => {
        this.watchFullScreen()
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        
        const {username}=memoryUtils.user
        const {pathname}=this.props.location;
        
        const menu = (
            <Menu>
                <Menu.ItemGroup key="g1" title="用户中心">
                    <Item key="1">你好,{username}</Item>
                    <Item key="2">个人信息</Item>
                    <Item key="avatar">
                        <Upload 
                            listType="picture"
                            onChange={this.handleChange}
                        >
                            {/* <LinkButton> */}
                                更换头像
                            {/* </LinkButton> */}
                        </Upload>
                    </Item>
                    <Item key="exit" onClick={this.exit}>退出登陆</Item>
                </Menu.ItemGroup>
            
                <Menu.ItemGroup key="设置" title="设置中心">
                    <Item key="1">个人设置</Item>
                </Menu.ItemGroup>
            </Menu>
        );
        return (
            <div className="my-header">
            {/* <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    /> */}
                <div>
                
                </div>
                <div className="top-header">
                <Icon type="arrows-alt"  hidden={this.state.isFullScreen} onClick={this.fullScreen}/>
                <Icon type="shrink" hidden={!this.state.isFullScreen} onClick={this.fullScreen}/>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar src={this.state.avatar} />
                </Dropdown>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader);
