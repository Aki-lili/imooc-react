import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v){
    console.log(v)
    this.props.history.push(`/chat/${v.user}`)
  }
  render() { 
    return ( 
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userList.map(v => (
            v.avatar ? (<Card onClick={() => this.handleClick(v)} key={v._id}>
              <Card.Header title={v.user} extra={<span>{v.title}</span>} thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"></Card.Header>
              <Card.Body>
                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
              </Card.Body>
            </Card>) : null
          ))
        }
      </WingBlank>
     );
  }
}
 
export default UserCard;