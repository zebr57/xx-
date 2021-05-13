import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'antd-mobile'

class NotFount extends Component {
	render() {
		return (
			<div>
				<h2>NotFount</h2>
				<Button type='primary' onClick={() => this.props.history.replace('/')}>
					回到首页
				</Button>
			</div>
		)
	}
}
export default connect(
	state => ({}),
	{}
)(NotFount)
