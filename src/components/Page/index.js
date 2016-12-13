import React from 'react';
import Marked from 'marked';
import parsePagePaths from '../../utility/parsePagePaths';

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
    if((this.props.params.name && nextState.pages.length) &&
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
    return <div className='page-container'
      dangerouslySetInnerHTML={this.state.template}></div>;
  }
}
