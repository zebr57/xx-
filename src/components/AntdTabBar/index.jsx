import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { TabBar } from 'antd-mobile'
const Item = TabBar.Item
class AntdTabBar extends Component {

	static propTypes = {
		navList: PropTypes.array.isRequired,
		unReadCount: PropTypes.number.isRequired
	}

	render() {
		let { navList, unReadCount } = this.props
		navList = navList.filter(item => {return !item.hide})
		const path = this.props.location.pathname
		return (
			<div>
				<TabBar 
					tabBarPosition="bottom"
					barTintColor={'#f5f5f5'}
					tintColor={'#333'}
					unselectedTintColor={'#888'}
				>
					{ navList.map((nav) => {
						return (
							<Item key={nav.path}
									title={nav.text}
									badge={nav.path==='/message' ? unReadCount : 0}
									icon={{uri: require(`./images/${nav.icon}.png`).default}}
									selectedIcon={{uri: require(`./images/${nav.icon}1.png`).default}}
									selected={path===nav.path}
									onPress={() =>{this.props.history.replace(nav.path)}}>
							</Item>
						)
					}) }
				</TabBar>
			</div>
		)
	}
}
export default withRouter(AntdTabBar)