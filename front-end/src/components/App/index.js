import React from 'react';
import Banner from '../Banner';
import Navigation from '../Navigation';
require('./styles.scss');

const renderChildren = (elements, state) => {
  return React.Children.map(elements, (e) => {
    let props = {hide: {}};
    if (e.props && e.props.params) {
      if (e.props.params.type === 'blog' || e.props.params.type === 'article') {
        props.hide.blog = state.hideBlog;
      }
      else if (e.props.params.type === 'gallery') {
        props.hide.gallery = state.hideGallery;
      }
    }
    return React.cloneElement(e, props);
  });
}

module.exports = class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bannerText: '',
      title: 'App',
      blogTitle: 'Blog',
      galleryTitle: 'Gallery',
      hideBlog: false,
      hideGallery: false
    }

    document.title = this.state.title;

    fetch('config').then((response) => {
        return response.ok ? response.json() : {};
      }).then((config) => {
        if(config) {
          let bannerText = config.banner || '';
          let title = config.title ||'App';
          let blogTitle = config.blogTitle || 'Blog';
          let galleryTitle = config.galleryTitle || 'Gallery';
          let hideBlog = (typeof config.hideBlog === 'boolean' &&
            config.hideBlog) || false;
          let hideGallery = (typeof config.hideGallery === 'boolean' &&
            config.hideGallery) || false;
          this.setState({bannerText, title, blogTitle, galleryTitle,
            hideBlog, hideGallery});
        }
      });
  }

  componentWillUpdate(props, state) {
    document.title = state.title;
  }

  render() {
    return <div className='app'>
      <Banner text={this.state.bannerText} />
      <Navigation blogTitle={this.state.blogTitle}
        hideBlog={this.state.hideBlog}
        hideGallery={this.state.hideGallery}
        galleryTitle={this.state.galleryTitle} />
      {renderChildren(this.props.children, this.state)}
    </div>;
  }
}
