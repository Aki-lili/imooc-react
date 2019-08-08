import React from 'react';
import { connect } from 'react-redux';
import { getUserlist } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
@connect(
  state => state.chatuser,
  { getUserlist }
)
class Boss extends React.Component {
  componentDidMount(){
    this.props.getUserlist('genius')
  }
  render() { 
    return <UserCard userList={this.props.userList}></UserCard>
  }
}
 
export default Boss;