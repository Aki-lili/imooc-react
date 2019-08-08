import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/log';
import '../../css/common.css'
import { connect } from 'react-redux';
import imoocForm from '../../component/imoocform/imoocform';
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';
// example 1
/*
function hello(){
  console.log('hello i love imooc')
}
function Wrapper(fn){
  return function(){
    console.log('before')
    fn()
    console.log('after')
  }
}
hello = Wrapper(hello)
hello()
*/

// example 2
/*
function WrapperHello(Comp) {
// 继承
  // class WrapComp extends Comp {
  //   componentDidMount(){
  //     console.log('componentDidMount')
  //   }
  //   render(){
  //     return <Comp></Comp>
  //   }
  // }
// 属性代理
  class WrapComp extends React.Component {
    render() {
      return (
        <div>
          <p>这是WrapComp组件1</p>
          <Comp {...this.props}></Comp>
        </div>
      )
    }
  }
  return WrapComp
}
@WrapperHello
class Hello extends React.Component {
  render(){
    return <h2>hello imooc i love react 这是Hello组件2</h2>
  }
}
*/
@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render() { 
    return (
      <div>
        {/* <Hello></Hello> */}
        <Logo></Logo>
        <h2 align="center">登录</h2>
        <WingBlank>
          <List>
            {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
            <InputItem onChange={v => this.props.handleChange('pwd', v)} type="password">密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="success">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
 
export default Login;