import React from 'react';
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  // 类型检测校验
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const avatatList = Array.from(new Array(12)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    const gridHeader = this.state.icon ? (<div><span>已经选择头像</span><img style={{width:20}} src={this.state.icon} alt="" /></div>) : '请选择头像'
    return ( 
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatatList} onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)}} />
        </List>
      </div>
     )
  }
}
 
export default AvatarSelector;