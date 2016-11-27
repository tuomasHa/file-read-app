import React from 'react';
import Image from './Image';
import TopModal from '../TopModal';
require('./style.scss');

const renderImage = (e, i, handler) =>{
  return <Image index={i} image={e} key={`image-${i}`} selectImage={handler}/>;
}

export default class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      images: [],
      modalIndex: 0,
      modalOpen: false
    };

    this.openModal = (index) => {
      this.setState({
        modalIndex: index,
        modalOpen: true
      });
    };

    this.prevImage = () => {
      if(this.state.modalIndex > 0){
        this.setState({
          modalIndex: this.state.modalIndex - 1
        });
      }
    };

    this.nextImage = () => {
      if(this.state.modalIndex < this.state.images.length -1){
        this.setState({
          modalIndex: this.state.modalIndex + 1
        });
      }
    };

    fetch('images').then((response) => {
        return response.json();
      }).then((obj) => {
        this.parseImagePaths(obj);
      });
  }

  render(){
    return <div className='gallery'>
      <TopModal open={this.state.modalOpen}
      image={this.getModalImage()} leftFunc={this.prevImage}
      rightFunc={this.nextImage}/>
        { this.state.images.map((e, i) => renderImage(e, i, this.openModal)) }
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

  getModalImage() {
    return this.state.images[this.state.modalIndex] || {name: '', path: ''};
  }
}
