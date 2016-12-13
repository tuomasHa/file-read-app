import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ModalImage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='modal-image'>
      <ReactCSSTransitionGroup
      transitionName='fade'
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
        <span className='modal-image-control modal-image-left'
        onClick={this.props.leftFunc} />
        <span className='modal-image-control modal-image-right'
        onClick={this.props.rightFunc} />
        <img key={'modal-image-' + this.props.image.name}
        src={this.props.image.path} alt={this.props.image.name} />
      </ReactCSSTransitionGroup>
    </div>;
  }
}
