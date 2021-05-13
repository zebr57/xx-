import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
} from '../actions-type'
import {getRedirectTo} from '../../utils/index'
const initState = {
	username: '',
	type: '',
	msg: '',
	redirectTo: ''
}
export default function setUser(preState=initState, action){
	const { type, data } = action
	switch (type) {
		case AUTH_SUCCESS:
			return {...data,redirectTo:getRedirectTo(data.type, data.header)}
		case ERROR_MSG:
			return {...preState, msg: data}
		case RECEIVE_USER:
			return data
		case RESET_USER:
			return {...initState, msg: data}
		default: 
			return preState
	}
}
