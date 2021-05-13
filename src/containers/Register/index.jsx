import React, { Component } from 'react'
import {
	NavBar,
	WingBlank,
	List,
	InputItem,
	WhiteSpace,
	Radio,
	Button,
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions/user'
import "../../index.css";
import Logo from '../../components/Logo/logo'
const ListItem = List.Item

class Register extends Component {
	state = {
		username: '',
		password: '',
		password2: '',
		type: 'master'
	}

	handleChange = (name,val)=>{
			this.setState({
				[name]: val
			})
	}



	register = ()=> {
		this.props.register(this.state)
		console.log(this.state,'11111111')
	}
	toLogin = ()=> {
		this.props.history.push('/login')
	}
	
	render() {
		const { type } = this.state
		const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值, 就需要重定向到指定的路由
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
		return (
			<div>
				<NavBar>hello,world!</NavBar>
				<Logo/>
				<WingBlank>
					<List>
						<WhiteSpace/>
						{msg ? <div className='error-msg'>{msg}</div> : null}
						<WhiteSpace/>
						<InputItem onChange={val => this.handleChange('username',val)} placeholder='请输入用户名'>用户名：</InputItem>
						<WhiteSpace/>
						<InputItem onChange={val => this.handleChange('password', val)} placeholder='请输入密码' type='password'>密  码：</InputItem>
						<WhiteSpace/>
						<InputItem onChange={val => this.handleChange('password2', val)} placeholder='请输入确认密码' type='password'>确认密码：</InputItem>
						<WhiteSpace/>
						<ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='master'} onChange={() => this.handleChange('type', 'master')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='boss'}  onClick={() => this.handleChange('type', 'boss')}>老板</Radio>
            </ListItem>
						<WhiteSpace/>
						<Button  onClick={this.register} type='primary'>注  册</Button>
						<Button onClick={this.toLogin}>已有账户</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}
export default connect(
  state => ({user: state.user}),
  {register}
)(Register)
