import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
	NavBar,
	InputItem,
	TextareaItem,
	Button,
	WhiteSpace
} from 'antd-mobile'
import HeaderSelection from '../HeaderSelection'
import { updateUser } from '../../redux/actions/user'

class MasterInfo extends Component {
	state = {
		header:'',
		post: '',
		info: '',
	}
	handleChange = (name,val)=> {
		this.setState({[name]:val})
	}
	setHeader = (header)=>{
		this.setState({header})
	}
	submit = () =>{
		this.props.updateUser(this.state)
	}
	render() {
		const { header, type } = this.props.user
		if (header) {
			const path = type === 'master' ? '/master' : '/boss'
			return <Redirect to={path}></Redirect>
		}
		return (
			<div>
				<NavBar>MasterInfo</NavBar>
				<HeaderSelection setHeader={this.setHeader}></HeaderSelection>
				<WhiteSpace></WhiteSpace>
				<InputItem placeholder='请输入求职职位' onChange={val => {this.handleChange('post', val)}}>求职职位:</InputItem>
				<TextareaItem title='个人介绍:' row={5} onChange={val => {this.handleChange('info', val)}}></TextareaItem>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<Button type='primary' onClick={this.submit}>保 存</Button>
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user}),
	{updateUser}
)(MasterInfo)
