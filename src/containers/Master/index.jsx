import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions/userList'
import UserList from '../../components/UserList'

class Master extends Component {
	componentDidMount(){
		this.props.getUserList('boss')
	}
	render() {
		const { userList } = this.props
		return (
			<UserList userList={userList}></UserList>
		)
	}
}

export default connect(
	state => ({userList: state.userList}),
	{getUserList}
)(Master)
