import React from 'react';
import {Link} from 'react-router';

module.exports = class Navigation extends React.Component{
  constructor(props){
    super(props);

    //do other stuff
  }

  render(){
    return <div className='navigation'>
      <ul className='link-list'>
        <li><Link to='/gallery'>Gallery</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
      </ul>
      {this.props.children}
    </div>;
  }
}
