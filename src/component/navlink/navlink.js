
import React from 'react';
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; // 由于不是路由页面，所以需要获取路由信息
@withRouter
class NavLinkBar extends React.Component {
  static propsType = {
    data: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const navList = this.props.data.filter(v=>!v.hide)
    const { pathname } = this.props.location
    return ( 
      <div>
        <TabBar>{navList.map(v => (
          <TabBar.Item title={v.text} key={v.path} icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />} selected={pathname === v.path} onPress={() => {
            this.props.history.push(v.path)
          }}>
          </TabBar.Item>
        ))}</TabBar>
      </div>
     );
  }
}
 
export default NavLinkBar;