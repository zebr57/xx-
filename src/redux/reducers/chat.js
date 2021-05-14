import { 
	RECEIVE_MSG_LIST,
	RECEIVE_MSG,
	MSG_READ
 } from '../actions-type'
const initChat = {
	user: {},
	chatMsgs: [],
	unReadCount: 0
}
export default function chat(state=initChat, action){
	const { type, data } = action
	switch (type) {
		case RECEIVE_MSG_LIST:
			const { users, chatMsgs, userid } = data
			return	{
				users,
				chatMsgs,
				unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)  //根据read和to -> me
			}
		case RECEIVE_MSG:
			const { chatMsg } = data
			return {
				users: state.users,
				chatMsgs: [...state.chatMsgs, chatMsg],
				unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===data.userid?1:0)
			}
		case MSG_READ:
			const { from, to, count } = data
			state.chatMsgs.forEach(msg => { 		//在rt外边 修改状态值
				if (msg.from===from && msg.to===to && !msg.read) {  //清除对应的记录
					msg.read = true
				}
			})
			return {
				users: state.users,
				chatMsgs: state.chatMsgs.map(msg => {  //赋值不能修改元素组  必须是纯函数
					if (msg.from===from && msg.to===to && !msg.read) {
						return {...msg, read: true}
					} else {
						return msg
					}
				}),
				unReadCount: state.unReadCount - count
			}
		default:
			return state
	}
}
