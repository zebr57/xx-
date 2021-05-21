import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
	static propTypes = {
		userList: PropTypes.array.isRequired
	}

	render() {
		const { userList } = this.props
		return (
			<WingBlank style={{marginBottom:50, marginTop:50}}>
				{
					userList.map(user => (
						<div key={user._id}>
							<WhiteSpace></WhiteSpace>
							<Card onClick={()=> this.props.history.push(`/chat/${user._id}`)}>
								<Header title={user.username}
												thumb={user.header ? require(`../../assets/images/${user.header}.png`).default : '`../../assets/images/头像1.png`'}
												extra={<span>This is title</span>}>
								</Header>
								<Body>
									<div>职位:{user.post}</div>
									{user.company ? <div>公司:{user.company}</div> : null}
									{user.salary ? <div>薪资:{user.salary}</div> : null}
									<div>描述:{user.info}</div>
								</Body>
							</Card>
						</div>
					))
				}
			</WingBlank>
		)
	}
}

export default withRouter(UserList)