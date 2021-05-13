import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMsg } from '../../redux/actions/chat'

import { NavBar, List, InputItem } from 'antd-mobile'
const Item = List.Item
class Chat extends Component {
	state = {
		content: ''
	}
	handleSend = ()=>{
		//收集数据
		const from = this.props.user._id
		const to = this.props.match.params.userid
		const content = this.state.content.trim()
		console.log('sendMsg','form:',from,'to:',to,"content:",content)

		//发送消息
		if(content) {
			this.props.sendMsg({from, to, content})
		}
	}

	render() {
		return (
			<div id='chat-page'>
				<NavBar>消息列表</NavBar>
				<List>
					<Item
						thumb={require(`../../assets/images/头像1.png`).default}
					>
						你好！
					</Item>
					<Item className='chat-me'
						extra={<img alt='touxiang' src={require(`../../assets/images/头像19.png`).default}></img>}
					>
						yo man！
					</Item>
				</List>
				<div className='am-tab-bar'>
					<InputItem
						placeholder='输入点什么...'
						value={this.state.content}
						onChange={val => this.setState({content: val})}
						extra={
							<span onClick={this.handleSend}>发送</span>
						}
					>
					
					</InputItem>
				</div>
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user}),
	{sendMsg}
)(Chat)