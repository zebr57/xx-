import {
	RECEIVE_MSG,
	RECEIVE_MSG_LIST
} from '../actions-type'
import { reqCharMsgList } from '../../api/index'
import io from 'socket.io-client'
/*		
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */
function initIO(dispath, userid) {
	if(!io.socket){
		io.socket = io('ws://localhost:4000', {transports: ['websocket']})
		//监听
		io.socket.on('receiveMsg', function(chatMsg){
			console.log('监听消息', chatMsg)
		})
	}
}
const receiveMsgList = ({users, chatMsg}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsg}})
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
const readMsg = ({count, from, to}) => ({type:'', data: {count, from, to}})

async function getMsgList(dispath){
	initIO()
	const response = await reqCharMsgList()
	const res = response.data
	if (res.code === 0) {
		const {users, chatMsg} = res.data
		//分发同步action
		dispath(receiveMsgList({users, chatMsg}))
	}
}

export const sendMsg = ({from, to, content}) => {
	return dispath => {
		console.log('客户端发送到后台：',{from, to, content})
		io.socket.emit('sendMsg', {from, to, content})
	}
}