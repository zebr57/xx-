import { combineReducers } from 'redux'

import user from './reducers/user'
import userList from './reducers/userList'
import chat from './reducers/chat'

export default combineReducers({
	user,
	userList,
	chat,
})