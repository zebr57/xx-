import { receiveMsgList, receiveMsg } from '../redux/actions/chat'
import io from 'socket.io-client'
import { reqCharMsgList } from '../api/index'

/*		
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */
function initIO(dispath, userid) {
	if(!io.socket){
		io.socket = io('ws://192.168.3.82:4000', {transports: ['websocket']})
		//监听
		io.socket.on('receiveMsg', function(chatMsg){
			console.log('监听消息', chatMsg,chatMsg.chat_id.indexOf(userid) !== -1)
			//只有chatMsg 是与当前用户相关的消息(发送或收到)， 才去分发同步action保存消息
			
			if (chatMsg.chat_id.indexOf(userid) !== -1) {
				dispath(receiveMsg(chatMsg, userid))
			}
		})
	}
}

export async function getMsgList(dispath, userid){
	initIO(dispath, userid)
	const response = await reqCharMsgList()
	const res = response.data
	if (res.code === 0) {
		const {users, chatMsgs} = res.data
		//分发同步action
		dispath(receiveMsgList({users, chatMsgs, userid}))
	}
}
