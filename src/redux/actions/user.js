import {
	reqRegister,
	reqLogin,
	reqUpdateUser,
	reqGetUser,
} from '../../api/index'
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
} from '../actions-type'
import {getMsgList} from '../../utils/initSocketIO'

const authSuccess = data => ({type: AUTH_SUCCESS, data})
 export const errorMsg = data => ({type: ERROR_MSG, data})

const receiveUser = data => ({type:RECEIVE_USER, data})
export const resetUser = data => ({type:RESET_USER, data})

export const register = (user) => {
	const { username,password,password2,type } = user 
	if(password !== password2) return dispath => {dispath(errorMsg('两次密码不一致'))} //验证表单
	return async dispath => {
		const response = await reqRegister({ username,password,type })
		const res = response.data
		if (res.code === 0) {
			getMsgList(dispath, res.data._id)
			dispath(authSuccess(res.data))
		} else {
			dispath(errorMsg(res.msg))
		}
	}
}

export const login = (user) => {
	return async dispath => {
		const response = await reqLogin(user)
		console.log(response,'response')
		const res = response.data
		if (res.code === 0) {
			getMsgList(dispath, res.data._id)
			dispath(authSuccess(res.data))
		} else {
			dispath(errorMsg(res.msg))
		}
	}
}

export const updateUser = (user) => {
	return async dispath => {
		const response = await reqUpdateUser(user)
		const res = response.data
		if (res.code === 0) {
			dispath(receiveUser(res.data))
		} else {
			dispath(resetUser(res.msg))
		}
	}
}

export const getUser = (user) => {
	return async dispath => {
		const response = await reqGetUser(user)
		const res = response.data
		if (res.code === 0) {
			getMsgList(dispath, res.data._id)
			dispath(receiveUser(res.data))
		} else {
			dispath(resetUser(res.msg))
		}
	}
}