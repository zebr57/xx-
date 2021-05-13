import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions/userList'
import UserList from '../../components/UserList'

class Boss extends Component {
	componentDidMount(){
		this.props.getUserList('master')
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
)(Boss)
