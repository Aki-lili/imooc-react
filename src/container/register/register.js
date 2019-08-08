import React from 'react';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/log';
import '../../css/common.css'
import { connect } from 'react-redux';
import imoocForm from '../../component/imoocform/imoocform';
import {register} from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
  state => state.user,
  { register }
)
@imoocForm // 通过高阶组件封装
class Register extends React.Component {
  constructor(props){
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render() { 
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2 align="center">注册页面</h2>
        <List>
          {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null }
          <InputItem onChange={v=>this.props.handleChange('user', v)}>用户名</InputItem>
          <InputItem onChange={v => this.props.handleChange('pwd', v)} type="password">密码</InputItem>
          <InputItem onChange={v => this.props.handleChange('repeatpwd', v)} type="password">确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
        </List>
        <Button onClick={this.handleRegister} type="primary">注册</Button>
      </div>
    )
  }
}
 
export default Register;