import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions/user'

import { Result, WhiteSpace, List, Button, Modal } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
	layOut = ()=> {
		Modal.alert('退出', '确定退出登陆吗?', [
      {text: '取消'},
      {
        text: '确定',
        onPress: ()=> {
          // 干掉cookie中userid
          Cookies.remove('userid')
          // 干掉redux管理user
          this.props.resetUser()
        }
      }
    ])
	}
	render() {
		const { username, header, company, post, info, salary } = this.props.user
		return (
			<div style={{marginBottom:50, marginTop:50}}>
				<Result img={<img src={require(`../../assets/images/${header}.png`).default} style={{width: 50}} alt="header"></img>}
								title={username}
								message={company}>
				</Result>
				<List renderHeader={() => '相关信息'}>
					 <Item multipleLine >
						<Brief>职位:{post}</Brief>
						<Brief>简介：{info}</Brief>
						{ salary ? <Brief>薪资:{salary}</Brief> : null }
					</Item>
				</List>
				<WhiteSpace/>
				<Button type='warning' onClick={this.layOut}>退出登录</Button>
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user}),
	{resetUser}
)(Personal)
