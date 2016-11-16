import React from 'react';
import {Link} from 'react-router';
require('./styles.scss');

module.exports = class Navigation extends React.Component{
  constructor(props){
    super(props);

    //do other stuff
  }

  render(){
    return <ul className='navigation'>
        <li><Link to='/gallery'>Gallery</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
      </ul>;
  }
}
