import React from 'react';
import './logo.css'
import logoImg from './Future.png';
class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
     );
  }
}
 
export default Logo;