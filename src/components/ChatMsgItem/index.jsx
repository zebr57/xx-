import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.less'
class ChatMsgItem extends Component {
	static propTypes = {
		msg: PropTypes.object.isRequired,
		targetIcon: PropTypes.string.isRequired,
		isRight: PropTypes.bool.isRequired,
	}
	render() {
		const { msg, targetIcon, isRight} = this.props
		return (
			<div className={isRight==='target'? "msg-item":'msg-item right'}>
				<div className="header-icon"  style={isRight?{opacity:0}:{}}>
					<img src={targetIcon} alt="icon" />
				</div>
				<div className="content-msg">
					<span className='text' style={isRight?{float: "right"}:{float: "left"}}>{msg.content}
					<div className={isRight?'weiclass right-weiclass':'weiclass left-weiclass'}></div>
					</span>
				</div>
				<div className="header-icon" style={isRight?{}:{opacity:0}}>
					<img src={targetIcon} alt="icon" />
				</div>
			</div>
		)
	}
}

export default withRouter(ChatMsgItem)