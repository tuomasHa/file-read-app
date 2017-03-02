import React from 'react';
import Marked from 'marked';
import generateVideoIframe from '../../utility/generateVideoIframe';
require('./styles.scss');

module.exports = class ArticlePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {template: {__html: ''}, articles: []};
    this.firstRenderDone = false;

    //Disable all html tags in the templates
    Marked.setOptions({sanitize: true});

    fetch('articles').then((response) => {
        return response.json();
      }).then((obj) => {
        this.parseArticlePaths(obj);
      });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.articles.length && nextProps.name &&
      (!this.firstRenderDone ||
      nextProps.name !== this.props.name)) {
      let article;
      nextState.articles.forEach((e) => {
        if(e.name === nextProps.name) {
          article = e;
        }
      });
      if(article && article.path) {
        fetch(article.path).then((response) => {
          return response.text();
        }).then((markdown) => {
          this.firstRenderDone = true;
          this.setState({template: {__html:  generateVideoIframe(Marked(markdown))}});
        });
      }
      //TODO: else show 'article not found'
    }
  }

  render(){
    return <div className='article-page'
    dangerouslySetInnerHTML={this.state.template}></div>;
  }

  //currently only parses the top folder
  parseArticlePaths(folder){
    if(folder && folder.children && folder.children.length){
      let articles = [];
      folder.children.forEach((e, i, a) => {
        if(!e.children && e.name && e.path){
          articles.push({name: e.name, path: e.path});
        }
      });
      let articlesDone = new Promise ((aResolve, aReject) => {
        let promiseCount = articles.length;
        let articlePromises = articles.map((e) => {
          let promise = new Promise((resolve, reject) => {
            fetch(e.path).then((response) => {
              return response.text();
            }).then((markdown) => {
              e.content = {__html: generateVideoIframe(Marked(markdown))};
              resolve();
            });
          });
          promise.then(() => {
            promiseCount--;
            if(promiseCount === 0){
              aResolve();
            }
          });
          return promise;
        });
      }).then(() => {
        this.setState({articles: articles});
      });
    }
    else return;
  }
}
