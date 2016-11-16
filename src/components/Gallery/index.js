import React from 'react';
import Image from './Image';
require('./style.scss');

const renderImage = (e, i) =>{
  return <Image index={i} image={e} key={`image-${i}`}/>;
}

module.exports = class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {images: []};

    fetch('images').then((response) => {
        return response.json();
      }).then((obj) => {
        this.parseImagePaths(obj);
      });
  }

  render(){
    return <div className='gallery'>
        { this.state.images.map((e, i) => renderImage(e, i)) }
      </div>;
  }

  //currently only parses the top folder
  parseImagePaths(folder){
    if(folder && folder.children && folder.children.length){
      let images = [];
      folder.children.forEach((e, i, a) => {
        if(!e.children && e.name && e.path){
          images.push({name: e.name, path: e.path});
        }
      });
      this.setState({images: images});
    }
    else return;
  }
}
