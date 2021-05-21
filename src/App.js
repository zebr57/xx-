import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../src/assets/css/AnimatedSwitch.less'
// import 'antd-mobile/dist/antd-mobile.css'; 
import Login from './containers/Login'
import Register from './containers/Register'
import Main from './containers/Main'

// const Routes = withRouter(({location}) => (
//   <TransitionGroup className={'router-wrapper'}>
//     <CSSTransition
//       timeout={300}
//       classNames={'fade'}
//       key={location.pathname}
//     >
//       <Switch location={location}>
//           <Route path='/login' component={Login}></Route>
//           <Route path='/register' component={Register}></Route>
//           <Route component={Main}></Route>
//       </Switch>
//     </CSSTransition>
//   </TransitionGroup>
// ));

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        {/* <Routes/> */}
        <Switch>          
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Main}></Route>
       </Switch>
      </HashRouter>
    )
  }
}
