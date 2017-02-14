import React from 'react';
import Image from './Image';

const renderImage = (e, index, subIndex, handler) =>{
  return <Image index={index} subIndex={subIndex} image={e} key={`image-${subIndex}`} selectImage={handler}/>;
}

export default class ImageSubset extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='gallery-image-subset'>
      <span className='image-subset-header'>{'subset'}</span>
      <div className='image-subset-body'>
        {this.props.folder.children.map((e, i) => renderImage(e, this.props.index, i, this.props.selectImage))}
      </div>
    </div>;
  }
}
