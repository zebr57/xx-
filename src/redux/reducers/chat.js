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
			return	
		case RECEIVE_MSG:
			return
		default:
			return state
	}
}
