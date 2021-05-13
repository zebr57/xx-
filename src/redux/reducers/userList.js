import {
	RECEIVE_USERLIST
} from '../actions-type'

const initUserList = []
export default function setUserList(preState=initUserList, action){
	const { type, data } = action
	switch (type) {
		case RECEIVE_USERLIST:
			return data
		default:
			return preState
	}
}