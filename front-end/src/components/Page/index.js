import React from 'react';
import Marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import parsePagePaths from '../../utility/parsePagePaths';
import generateVideoIframe from '../../utility/generateVideoIframe';
import Blog from '../Blog';
import Gallery from '../Gallery';
import ArticlePage from '../ArticlePage';
require('./style.scss');

const renderPage = (type, name, template, hide) => {
  switch(type){
    case 'blog':
      return hide.blog ? '' : <Blog key='blog'/>;
    case 'gallery':
      return hide.gallery ? '' : <Gallery key='gallery'/>;
    case 'article':
      if(name && typeof name === 'string') {
        return hide.blog ? '' : <ArticlePage key={'article-' + name} name={name}/>;
      }
    case 'page':
      if(name && typeof name === 'string'){
        return <div key={'page-' + name} className='page-container'
          dangerouslySetInnerHTML={template}></div>
      }
    default:
      //TODO: Return 'page not found'-component here
  }
}

export default class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {template: {__html: ''}, pages: []};
    this.firstRenderDone = false;

    //Disable all html tags in the templates
    Marked.setOptions({sanitize: true});

    fetch('pages').then((response) => {
        return response.json();
      }).then((obj) => {
        let pages = parsePagePaths(obj);
        this.setState({pages: pages});
      });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.pages.length && nextProps.params.name &&
      (!this.firstRenderDone ||
      nextProps.params.name !== this.props.params.name)) {
      let page;
      nextState.pages.forEach((e) => {
        if(e.name === nextProps.params.name) {
          page = e;
        }
      });
      if(page && page.path) {
        fetch(page.path).then((response) => {
          return response.text();
        }).then((markdown) => {
          this.firstRenderDone = true;
          this.setState({template: {__html:  generateVideoIframe(Marked(markdown))}});
        });
      }
      //TODO: else show 'page not found'
    }
  }

  render(){
    return <ReactCSSTransitionGroup
    transitionName='page-fade'
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    className='page-animation-container'>
      {renderPage(this.props.params.type, this.props.params.name,
         this.state.template, this.props.hide)}
    </ReactCSSTransitionGroup>;
  }
}
