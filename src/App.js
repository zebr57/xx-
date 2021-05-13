import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import 'antd-mobile/dist/antd-mobile.css'; 
import Login from './containers/Login'
import Register from './containers/Register'
import Main from './containers/Main'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Main}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
