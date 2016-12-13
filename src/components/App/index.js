import React from 'react';
import Navigation from '../Navigation';
require('./styles.scss');

module.exports = class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='app'>
      <Navigation />
      {this.props.children}
    </div>;
  }
}
