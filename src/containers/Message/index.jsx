import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

/*
对chatMsgs按chat_id进行分组, 并得到每个组的lastMsg组成的数组
1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id, lastMsg} lastMsgObjs
2. 得到所有lastMsg的数组 lastMsgs
3. 对数组进行排序(按create_time降序)
 */
	/*
		chatMsgs.forEach(msg => {
		const chatId = msg.chat_id  //获取当前聊天的id
		let lastMsg = lastMsgObjs[chatId]
		if (!lastMsg) {
			lastMsgObjs[chatId] = msg   //第一次聊天
		} else {
			if(lastMsgObjs[chatId].create_time < msg.create_time){
				lastMsgObjs[chatId] = msg
			}
		}
	});
	const lastMsgs = Object.values(lastMsgObjs)		//获取所有最后一条信息集合
	lastMsgs.sort(function (m1,m2) {							// < 0 m1放前面 = 0 不变， > 0 后面
		return m2.create_time - m1.create_time
	})
	console.log( lastMsgs,"lastMsgs" )
	return lastMsgs
	*/
function getLastMsgList(chatMsgs, userid) {
	const lastMsgObjs = {}
	chatMsgs.forEach(msg => {
		//对每个msg统计未读数量
		if (msg.to===userid && !msg.read) {		//发送给我的，并且未读状态
			msg.unReadCount =  1 
		} else {
			msg.unReadCount = 0
		}

		const chatId = msg.chat_id
		let lastMsg = lastMsgObjs[chatId]
		if (!lastMsg) {
			lastMsgObjs[chatId] = msg
		} else {
			lastMsgObjs[chatId].create_time < msg.create_time && (lastMsgObjs[chatId] = msg)

			const unReadCount = lastMsg.unReadCount + msg.unReadCount  //循环累加
			lastMsgObjs[chatId].unReadCount = unReadCount		
		}
	});
	const lastMsgs = Object.values(lastMsgObjs)
	lastMsgs.sort(function(m1,m2){
		return m2.create_time - m1.create_time 
	})
	console.log(lastMsgs,'lastmsgs')
	return lastMsgs
}

class Message extends Component {
	render() {
		const { user } = this.props
		const { chatMsgs, users } = this.props.chat
		const lastMsgs = getLastMsgList(chatMsgs, user._id)
		console.log(chatMsgs);
		return (
			<div style={{marginTop:50}}>
				<List className='messges-list'>
					{
						lastMsgs.map(msg => {
							const targetUserId = user._id === msg.to ? msg.from : msg.to
							const targetUser = users[targetUserId]
							console.log(targetUser)
							return (
								<Item
									key={msg._id}
									extra={<Badge text={msg.unReadCount}></Badge>}
									thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`).default : null}
									arrow='horizontal'
									onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
									>
									{targetUser.username}
									<Brief>{msg.content}</Brief>
								</Item>
							)
						})
					}
				</List>
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user, chat: state.chat}),
	{}
)(Message)
