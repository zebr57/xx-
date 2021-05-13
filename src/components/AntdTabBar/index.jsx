import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { TabBar } from 'antd-mobile'
const Item = TabBar.Item
class AntdTabBar extends Component {

	static propTypes = {
		navList: PropTypes.array.isRequired
	}

	render() {
		let { navList } = this.props
		navList = navList.filter(item => {return !item.hide})
		const path = this.props.location.pathname
		return (
			<div>
				<TabBar tabBarPosition="bottom">
					{ navList.map((nav) => {
						return (
							<Item key={nav.path}
									title={nav.text}
									icon={{uri: require(`./images/${nav.icon}.png`).default}}
									selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`).default}}
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