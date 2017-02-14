import React from 'react';
import Image from './Image';
import ImageSubset from './ImageSubset';
import TopModal from '../TopModal';
require('./style.scss');

const renderImage = (e, i, handler) =>{
  return e.children ? <ImageSubset index={i} folder={e} index={i}
    key={`image-subset-${i}`} selectImage={handler} /> :
    <Image index={i} subIndex={-1} image={e} key={`image-${i}`} selectImage={handler}/>;
}

export default class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      images: [],
      modalIndex: 0,
      modalOpen: false
    };

    this.openModal = (index, subIndex) => {
      this.setState({
        modalIndex: index,
        modalSubIndex: subIndex,
        modalOpen: true
      });
    };

    this.closeModal = () => {
      this.setState({
        modalOpen: false
      });
    };

    this.prevImage = () => {
      let modalIndex;
      let modalSubIndex;

      //if prev image is in this subsection
      if (this.state.modalSubIndex > 0) {
        modalIndex = this.state.modalIndex;
        modalSubIndex = this.state.modalSubIndex -1;
      }
      //else prev image is not in this subsection
      else {
        modalIndex = (this.state.modalIndex > 0) ?
          this.state.modalIndex - 1 : this.state.images.length - 1;
        modalSubIndex = -1;
        let children = this.state.images[modalIndex].children;

        //if image is in another subsection
        if (children && children.length) {
          modalSubIndex = children.length -1; //Select last image in subsection
        }
      }
      this.setState({ modalIndex, modalSubIndex });
    };

    this.nextImage = () => {
      let modalIndex = this.state.modalIndex;
      let children = this.state.images[modalIndex] &&
        this.state.images[modalIndex].children;
      let modalSubIndex;

      //if next image is in this subsection
      if (children && children.length &&
        this.state.modalSubIndex < children.length -1) {
        modalSubIndex = this.state.modalSubIndex +1;
      }
      //else next image is not in this subsection
      else {
        modalIndex = (this.state.modalIndex < this.state.images.length -1) ?
          this.state.modalIndex +1 : 0;
        modalSubIndex = -1;
        children = this.state.images[modalIndex].children;

        //if image is in another subsection
        if (children && children.length) {
          modalSubIndex = 0; //Select last image in subsection
        }
      }
      this.setState({ modalIndex, modalSubIndex });
    };

    fetch('images').then((response) => {
        return response.json();
      }).then((obj) => {
        this.parseImagePaths(obj);
      });
  }

  render(){
    return <div className='gallery'>
      <TopModal open={this.state.modalOpen} modalKey='gallery-modal'
      image={this.getModalImage()} leftFunc={this.prevImage}
      rightFunc={this.nextImage} closeModal={this.closeModal}/>
        { this.state.images.map((e, i) => renderImage(e, i, this.openModal)) }
      </div>;
  }

  //currently parses 1 level of subfolders
  parseImagePaths(folder){
    if (folder && folder.children && folder.children.length) {
      let images = [];
      folder.children.forEach((e, i, a) => {
        if (!e.children && e.name && e.path) {
          images.push({name: e.name, path: e.path});
        }
        else if (e.children.length && e.name && e.path) {
          let content = [];
          e.children.forEach((el, ind, arr) => {
            if (!el.children && el.name && el.path) {
              content.push({name: el.name, path: el.path});
            }
          });
          images.push({name: e.name, path: e.path, children: content});
        }
      });
      this.setState({images: images});
    }
    else return;
  }

  getModalImage() {
    let image = this.state.images[this.state.modalIndex];
    if (this.state.modalSubIndex === -1 || !image ||
      !image.children || !image.children.length) {
      return image || {name: '', path: ''};
    }
    else {
      return image.children[this.state.modalSubIndex] || {name: '', path: ''};
    }
  }
}
