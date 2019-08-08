import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux'
// react4提供的查看路由方法
import { withRouter } from 'react-router-dom'
@withRouter
@connect(
  null,
  { loadData }
)

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    const publicList = ['/login','/register']
    const pathName = this.props.history.location.pathname //当前路由地址
    if (publicList.indexOf(pathName) > -1){
      return null
    }
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if(res.data.code === 0){
          // 有登陆信息
          this.props.loadData(res.data.data)
        }else{
          this.props.history.push('/login')
        }
        console.log(res.data);
      }
    })
  }
  render() { 
    return (
      <div></div>
    )
  }
}
 
export default AuthRoute;