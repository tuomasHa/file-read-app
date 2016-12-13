import React from 'react';
import Marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import parsePagePaths from '../../utility/parsePagePaths';
import Blog from '../Blog';
import Gallery from '../Gallery';
require('./style.scss');

const renderPage = (type, name, template) => {
  switch(type){
    case 'blog':
      return <Blog key='blog'/>
      break;
    case 'gallery':
      return <Gallery key='gallery'/>
      break;
    case 'page':
      if(name && typeof name === 'string'){
        return <div key={'page-' + name} className='page-container'
          dangerouslySetInnerHTML={template}></div>
      }
    default:
      //Return 'page not found'-component here
  }
}

export default class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {template: {__html: ''}, pages: []};
    this.firstRenderDone = false;

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
      nextProps.params.name !== this.props.params.name)){
      let page = nextState.pages.find((e) => {
        return e.name === nextProps.params.name;
      });
      fetch(page.path).then((response) => {
        return response.text();
      }).then((markdown) => {
        this.firstRenderDone = true;
        this.setState({template: {__html: Marked(markdown)}});
      });
    }
  }

  render(){
    return <ReactCSSTransitionGroup
    transitionName='page-fade'
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    className='page-animation-container'>
      {renderPage(this.props.params.type, this.props.params.name,
         this.state.template)}
    </ReactCSSTransitionGroup>;
  }
}
