import React from 'react';
import Banner from '../Banner';
import Navigation from '../Navigation';
require('./styles.scss');

module.exports = class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='app'>
      <Banner text='Banner Text' />
      <Navigation />
      {this.props.children}
    </div>;
  }
}
