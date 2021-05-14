import {
	RECEIVE_MSG,
	RECEIVE_MSG_LIST,
	MSG_READ
} from '../actions-type'
import { reqReadMsg } from '../../api/index'
import io from 'socket.io-client'
// import {getMsgList} from '../../utils/initSocketIO'
/*		
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */
// function initIO(dispath, userid) {
// 	if(!io.socket){
// 		io.socket = io('ws://localhost:4000', {transports: ['websocket']})
// 		//监听
// 		io.socket.on('receiveMsg', function(chatMsg){
// 			console.log('监听消息', chatMsg)
// 		})
// 	}
// }
export const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})
export const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
export const msgRead = ({count, from, to}) => ({type:MSG_READ, data: {count, from, to}})

// async function getMsgList(dispath){
// 	initIO()
// 	const response = await reqCharMsgList()
// 	const res = response.data
// 	if (res.code === 0) {
// 		const {users, chatMsg} = res.data
// 		//分发同步action
// 		dispath(receiveMsgList({users, chatMsg}))
// 	}
// }

export const sendMsg = ({from, to, content}) => {
	return dispath => {
		console.log('客户端发送到后台：',{from, to, content})
		// initIO()
		io.socket.emit('sendMsg', {from, to, content})
	}
}

export const readMsg = (from,to) =>{
	return async dispath => {
		const response = await reqReadMsg(from)
		const res = response.data
		if (res.code === 0) {
			const count = res.data
			dispath(msgRead({count, from, to}))
		}
	}
}