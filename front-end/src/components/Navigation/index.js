import React from 'react';
import {Link} from 'react-router';
import parsePagePaths from '../../utility/parsePagePaths';
require('./styles.scss');

const renderLink = (e, i) =>{
  return <li key={`link-${i}`}><Link to={'/page/' + e.name}>{formatLinkName(e.name)}</Link></li>;
}

const formatLinkName = (name) =>{
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default class Navigation extends React.Component{
  constructor(props){
    super(props);

    this.state = {pages: []};

    fetch('pages').then((response) => {
        return response.json();
      }).then((obj) => {
        let pages = parsePagePaths(obj);
        this.setState({pages: pages});
      });
  }

  render(){
    return <ul className='navigation'>
        { this.state.pages.map((e, i) => renderLink(e, i)) }
        {this.props.hideBlog ? '' :
          <li><Link to='/blog'>{this.props.blogTitle}</Link></li>}
        {this.props.hideGallery ? '' :
          <li><Link to='/gallery'>{this.props.galleryTitle}</Link></li>}
      </ul>;
  }
}
