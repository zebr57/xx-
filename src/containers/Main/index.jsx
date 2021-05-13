import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()

import BossInfo from '../BossInfo'
import MasterInfo from '../MasterInfo'
import Boss from '../Boss'
import Master from '../Master'
import Personal from '../personal'
import Message from '../Message'
import Chat from '../Chat'
import NotFount from '../../components/NotFount'
import AntdTabBar from '../../components/AntdTabBar'

import { NavBar } from 'antd-mobile'

import '../../assets/css/index.less'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions/user'

class Main extends Component {

	// 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '大神列表',
      icon: 'master',
      text: '大神',
    },
    {
      path: '/master', // 路由路径
      component: Master,
      title: '老板列表',
      icon: 'boss',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

	componentDidMount(){
		const userid = Cookies.get('userid')
		const {_id} = this.props.user
		if (userid && !_id) {
			this.props.getUser()
		}
	}
	render() {
		const userid = Cookies.get('userid')
		if (!userid) return <Redirect to='/login'></Redirect>
		const {user} = this.props
		if(!user._id){
			// return <Redirect to='/login'></Redirect>
			return null
		} else {
			let path = this.props.location.pathname
			if(path==='/'){
				path = getRedirectTo(user.type, user.header)
				return <Redirect to={path}></Redirect>
			}
		}

		const { navList } = this
		const path = this.props.location.pathname //请求路径
		const currentNav = navList.find(nav => nav.path===path) 
		if(currentNav){
			if(user.type==='master'){
				navList[0].hide = true
			} else {
				navList[1].hide = true
			}
		}

		return (
			<div>
				{currentNav ? <NavBar className='sticky-herader'>{currentNav.title}</NavBar> : null}
				<Switch>
					{ navList.map(nav =>	<Route path={nav.path} component={nav.component} key={nav.path}></Route>) }
					<Route path='/bossInfo' component={BossInfo}></Route>
					<Route path='/masterInfo' component={MasterInfo}></Route>
					{/* <Route path='/boss' component={Boss}></Route>
					<Route path='/master' component={Master}></Route>
					<Route path='/personal' component={Personal}></Route> */}
					<Route path='/chat/:userid' component={Chat}></Route>
					<Route component={NotFount}></Route>
				</Switch>
				{currentNav ? <AntdTabBar navList={navList}></AntdTabBar> : null}
			</div>
		)
	}
}
export default connect(
	state => ({user: state.user}),
	{getUser}
)(Main)
/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但还没有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */