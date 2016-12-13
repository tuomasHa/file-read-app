import React from 'react';

export default class Image extends React.Component{
  constructor(props){
    super(props);

    this.openImage = () => {
      props.selectImage(props.index);
    }
  }

  render(){
    return <div className='gallery-image-container'>
      <img className='gallery-image' src={this.props.image.path}
      alt={this.props.image.name}  onClick={this.openImage} />
    </div>;
  }
}
