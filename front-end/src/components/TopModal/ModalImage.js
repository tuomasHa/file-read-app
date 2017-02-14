import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const imageStyle = (imagePath) => {
  return { backgroundImage: 'url(' + imagePath + ')'};
}

export default class ModalImage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='modal-image-frame'>
      <ReactCSSTransitionGroup
      transitionName='fade'
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
        <span className='modal-image-control modal-image-left'
        onClick={this.props.leftFunc} />
        <span className='modal-image-control modal-image-right'
        onClick={this.props.rightFunc} />
        <div key={'modal-image-' + this.props.image.name}
        className='modal-image'
        style={imageStyle(this.props.image.path)}/>
      </ReactCSSTransitionGroup>
    </div>;
  }
}
