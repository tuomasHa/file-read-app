import React from 'react';

export default class ModalImage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='modal-image'>
      <span className='modal-image-control modal-image-left'
      onClick={this.props.leftFunc} />
      <span className='modal-image-control modal-image-right'
      onClick={this.props.rightFunc} />
      <img src={this.props.image.path} alt={this.props.image.name} />
    </div>;
  }
}
