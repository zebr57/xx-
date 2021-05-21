import React, { Component } from 'react'
import {
	NavBar,
	WingBlank,
	List,
	InputItem,
	WhiteSpace,
	Button,
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login, errorMsg} from '../../redux/actions/user'

import Logo from '../../components/Logo/logo'

class Login extends Component {
	state = {
		username: '',
		password: '',
	}
	componentDidMount(){
		this.props.errorMsg('')
	}
	handleChange = (name,val)=>{
			this.setState({
				[name]: val
			})
	}

	login = ()=> {
		this.props.login(this.state)
	}
	toRegister = ()=> {
		this.props.history.push('/register')
	}
	
	render() {
		const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值, 就需要重定向到指定的路由
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
		return (
			<div>
				<NavBar>xx-直聘</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<Logo/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WingBlank>
					<List>
						<WhiteSpace/>
						{msg ? <div className='error-msg'>{msg}</div> : null}
						<WhiteSpace/>
						<InputItem onChange={val => this.handleChange('username',val)} placeholder='请输入用户名'>用户名：</InputItem>
						<WhiteSpace/>
						<InputItem onChange={val => this.handleChange('password', val)} placeholder='请输入密码' type='password'>密  码：</InputItem>
						<WhiteSpace/>
						<WhiteSpace/>
						<Button  onClick={this.login} type='primary'>登  录</Button>
						<Button onClick={this.toRegister}>还没有账户</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}
export default connect(
	state => ({user:state.user}),
	{login, errorMsg}
)(Login)