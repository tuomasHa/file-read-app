import React from 'react';
require('./styles.scss');

export default class Banner extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='header-banner'>
      <div className='header-banner-logo'></div>
      <span className='header-banner-text'>{this.props.text}</span>
    </div>;
  }
}
