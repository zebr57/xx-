import { 
	RECEIVE_MSG_LIST,
	RECEIVE_MSG
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
			const { users, chatMsgs } = data
			return	{
				users,
				chatMsgs,
				unReadCount: 0
			}
		case RECEIVE_MSG:
			const { chatMsg } = data
			return {
				users: state.users,
				chatMsgs: [...state.chatMsgs, chatMsg]
			}
		default:
			return state
	}
}
