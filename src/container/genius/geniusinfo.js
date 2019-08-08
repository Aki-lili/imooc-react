import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar/avatar-selector'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../redux/user.redux'
@connect(
  state => state.user,
  { update }
)
class genius extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: ""
    }
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">boss完善信息页面</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
          this.setState({
            avatar: imgname
          })
        }}></AvatarSelector>
        <InputItem onChange={(v) => this.handleChange('title', v)}>招聘岗位</InputItem>
        <TextareaItem onChange={(v) => this.handleChange('desc', v)} rows={3} autoHeight title="岗位要求"></TextareaItem>
        <Button type='primary' onClick={() => this.props.update(this.state)}>保 存</Button>
      </div>
    )
  }
}

export default genius;