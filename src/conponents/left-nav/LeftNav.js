
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { reqMenuList } from '../../api'
import './LeftNav.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;
export class LeftNav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuNodes: []
		}
	}

	getMenuList = async () => {
		const data = await reqMenuList();
		const menuNodes = this.getMenuNodes(data.data);
		this.setState({
			menuNodes
		})
	}

	getMenuNodes = (menuList) => {
		if (!menuList) return
		return menuList.map((item) => {
			if (!item.children.length) {
				return (
					<Menu.Item key={item.id}>
						<Link to={'/' + item.url}>
							{/* <Icon type={item.icon} /> */}
							<i aria-label="图标" className={item.icon}></i>
							<span className='menu-title'
							>{item.text}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				const pathname = this.props.location.pathname;
				const cItem = item.children.find((cItem) => cItem.url === pathname);
				if (cItem) {
					this.openKey = item.id
				}
				return (
					<SubMenu
						key={item.id}
						title={
							<span>
								{/* <Icon type={item.icon} /> */}
								<i aria-label="图标" className={item.icon}></i>
								<span className='menu-title'>{item.text}</span>
							</span>
						}
					>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				)
			}
		})
	}

	componentDidMount() {
		this.getMenuList();
	}

	render() {
		const selectKey = this.props.location.pathname;
		console.log(selectKey);

		let dispaly = this.props.show ? 'none' : 'inline-block';
		console.log();
		return (
			<div className="left-nav" >
				<Link to="/" className="left-nav-header">
					{/* <img src={logo} alt=""/> */}
					<h3 hidden={this.props.show}>扶贫电商系统</h3>
				</Link>
				<div className="left-nav-menu">
					<Menu
						selectable={true}
						// selectedKeys={[selectKey]}
						defaultOpenKeys={[this.openKey]}
						mode="inline"
						theme="dark"
					>
						{
							this.state.menuNodes
						}
					</Menu>
				</div>
			</div>
		)
	}
}

export default withRouter(LeftNav)
