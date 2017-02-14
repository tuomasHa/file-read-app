import React from 'react';
import Image from './Image';

const renderImage = (e, index, subIndex, handler) =>{
  return <Image index={index} subIndex={subIndex} image={e} key={`image-${subIndex}`} selectImage={handler}/>;
}

export default class ImageSubset extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: {},
      images: props.folder.children
    };
    props.folder.children.forEach((e, i, a) => {
      if (e.name === 'title.json') {
        this.state.title = e;
        this.state.images.splice(i, 1);
      }
    });
    let title = this.state.title;
    if (title && title.path) {
      fetch(title.path).then((response) => {
          return response.json();
        }).then((arr) => {
          if (arr && arr.length) {
            title.text = arr[0];
            this.setState({title});
          }
        });
    }
  }

  render(){
    return <div className='gallery-image-subset'>
      <span className='image-subset-header'>{this.state.title.text || ''}</span>
      <div className='image-subset-body'>
        {this.state.images.map((e, i) => renderImage(e, this.props.index, i, this.props.selectImage))}
      </div>
    </div>;
  }
}
