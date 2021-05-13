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
class BossInfo extends Component {

	state = {
		header: '',
		post: '',
		info: '',
		company: '',
		salary: '',
	}

	setHeader = (header)=>{
		this.setState({header})
	}
	handleChange = (name, val)=> {
		this.setState({[name]: val})
	}
	submit =() => {
		console.log(this.state)
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
				<NavBar>BossInfo</NavBar>
				<HeaderSelection setHeader={this.setHeader}></HeaderSelection>
				<WhiteSpace></WhiteSpace>
				<InputItem placeholder='请输入招聘职位' onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
				<InputItem placeholder='请输入公司名称' onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
				<InputItem placeholder='请输入职位薪资' onChange={val => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
				<TextareaItem title='职位要求' row={3}  onChange={val => {this.handleChange('info', val)}}></TextareaItem>
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
)(BossInfo)
