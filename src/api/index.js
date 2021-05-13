import ajax from './ajax'

export const reqRegister = (data) => ajax('/register', data, 'POST')		//注册
export const reqLogin = ({username, password}) => ajax('/Login', {username, password}, 'POST')		//登录
export const reqUpdateUser = (data) => ajax('/update', data, 'POST')		//更新用户信息
export const reqGetUser = () => ajax('/user')		//获取用户信息
export const reqGetUserList = (type) => ajax('/userList',{type})		//获取用户列表

export const reqCharMsgList = () => ajax('/msglist')
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')