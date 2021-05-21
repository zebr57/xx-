import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { List, Grid } from 'antd-mobile'

export default class HeaderSelection extends Component {
	static propTypes = {
		setHeader: PropTypes.func.isRequired
	}
	state = {
		icon: null //头像对象
	}
	constructor(props){
		super(props)
		this.headerList = []
		for (let i = 0; i < 20; i++) {
			this.headerList.push({
				text: '头像'+(i+1),
				icon: require(`../../assets/images/头像${i+1}.png`).default
			})
		}
	}
	handleClick = ({text, icon})=>{
		this.setState({icon})
		this.props.setHeader(text)
	}
	render() {
		const { icon } = this.state
		const headerTitle = !icon ? "请选择头像": (
			<div>
				已选择头像
				<img src={icon} alt='头像'/>
			</div>
		)
		return (
			<List renderHeader={()=>headerTitle} >
				<Grid data={this.headerList}
							columnNum={5}
							onClick={this.handleClick}>
				</Grid>
			</List>
		)
	}
}

