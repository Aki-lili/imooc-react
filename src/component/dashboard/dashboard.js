import React from 'react';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink/navlink'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
function Msg() {
  return <h2>msg 首页</h2>
}
@connect(
  state => state
)
class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [{
      path: "/boss",
      text:"牛人",
      icon:"cross-circle",
      title:"牛人列表",
      component:Boss,
      hide: user.type === 'genius'
    }, {
        path: "/genius",
        text: "boss",
        icon: "cross-circle",
        title: "boss列表",
        component: Genius,
        hide: user.type === 'boss'
      }, {
        path: "/msg",
        text: "消息",
        icon: "cross-circle",
        title: "消息",
        component: Msg
      }, {
        path: "/me",
        text: "我",
        icon: "cross-circle",
        title: "个人中心",
        component: User
      }]
    return ( 
      <div>
        <NavBar className="fixd-header" mode="dard">{navList.find(v => v.path===pathname).title}</NavBar>
        <div>
          <Switch>{
            navList.map(v =>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))
          }</Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
     );
  }
}
 
export default dashboard;