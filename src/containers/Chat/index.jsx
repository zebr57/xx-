import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMsg, readMsg } from '../../redux/actions/chat'

import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
const Item = List.Item

class Chat extends Component {
	state = {
		content: '',
		isShowEmoji: false
	}
	componentWillMount () {
    // 初始化表情列表数据
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }
	componentDidMount(){
		window.scrollTo(0, document.body.scrollHeight)
	}
	componentDidUpdate () {
    window.scrollTo(0, document.body.scrollHeight)
  }
	componentWillUnmount(){
		const from = this.props.match.params.userid
		const to = this.props.user._id
		this.props.readMsg(from, to)
	}
	handleSend = ()=>{
		//收集数据
		const from = this.props.user._id
		const to = this.props.match.params.userid
		const content = this.state.content.trim()
		//发送消息
		if(content) {
			this.props.sendMsg({from, to, content})
			this.setState({content: '', isShowEmoji: false})
		}
	}
	handleEmoji = () => {
		const isShowEmoji = !this.state.isShowEmoji
		this.setState({isShowEmoji})
		if(isShowEmoji) {
			setTimeout(()=> {
        window.dispatchEvent(new Event('resize'))
				window.scrollTo(0, document.body.scrollHeight)
			},0)
		}
	}
	handleClikEmoji = (val) => {
		const content = this.state.content + val.text
		this.setState({content})
	}

	render() {
		const { user } = this.props
		const { users, chatMsgs } = this.props.chat
		const { isShowEmoji } = this.state
		const myId = user._id
    if(typeof users === 'undefined') { // 如果还没有获取数据, 直接不做任何显示
      return null
    }
		const targetId = this.props.match.params.userid		//拿到当前用户和目标用户
		const chatId = [myId, targetId].sort().join('_')

		const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)		//筛选出对应的聊天信息

		const targetHeader = users[targetId].header
		const myHeader = users[myId].header
		const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`).default : null
		const myIcon = myHeader ? require(`../../assets/images/${myHeader}.png`).default : null
		return (
			<div id='chat-page'>
				<NavBar className='sticky-herader'
					mode="drak"
					icon={<Icon type="left" />}
					onLeftClick={() => {this.props.history.goBack()}}
					rightContent={[
						<Icon key="1" type="ellipsis" />,
					]}
				>{users[targetId].username}</NavBar>
				<List style={{marginTop:50, marginBottom: isShowEmoji ? 0: 50}}>
					{
						msgs.map(msg => {
							if (targetId === msg.from) {		// 对方发的消息
								return (
									<Item
										key={msg._id}
										thumb={targetIcon}>
										{msg.content}
									</Item>
								) 
							} else {												// 我发的消息
								return (
									<Item className='chat-me'
										key={msg._id}
										extra={<img alt='touxiang' src={myIcon}></img>}>
										{msg.content}
									</Item>
								)
							}
						})
					}
				
					
				</List>
				<div className={isShowEmoji ? '': 'am-tab-bar'}>
					<InputItem
						placeholder='输入点什么...'
						value={this.state.content}
						onFocus={()=> {this.setState({isShowEmoji: false})}}
						onChange={val => this.setState({content: val})}
						extra={
							<div>
								<span className='emoji' onClick={this.handleEmoji}>😀</span>
								<span onClick={this.handleSend}>发送</span>
							</div>
						}
					>
					</InputItem>
					{this.state.isShowEmoji ? (
						<Grid className='emoji-grid'
							data={this.emojis}
							columnNum={8}
							carouselMaxRow={4}
							isCarousel={true}
							onClick={this.handleClikEmoji}
						>
						</Grid>
					) : null}
					
				</div>
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user, chat: state.chat}),
	{sendMsg, readMsg}
)(Chat)