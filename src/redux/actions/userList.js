import {
	RECEIVE_USERLIST
} from '../actions-type'
import { reqGetUserList } from '../../api/index'

const receiveUserList = (data) => ({type: RECEIVE_USERLIST, data})

export const getUserList = (type) => {
	return async dispath => {
		const response = await reqGetUserList(type)
		const res = response.data
		if (res.code === 0) {
			dispath(receiveUserList(res.data))
		}
	}
}