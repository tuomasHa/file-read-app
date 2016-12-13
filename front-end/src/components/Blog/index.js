import React from 'react';
import Article from './Article';
import Marked from 'marked';
require('./style.scss');

const renderArticle = (e, i) =>{
  return <Article index={i} article={e} key={`article-${i}`}/>;
}

module.exports = class Blog extends React.Component{
  constructor(props){
    super(props);
    this.state = {articles: []};

    fetch('articles').then((response) => {
        return response.json();
      }).then((obj) => {
        this.parseArticlePaths(obj);
      });
  }

  render(){
    return <div className='blog'>
        { this.state.articles.map((e, i) => renderArticle(e, i)) }
      </div>;
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
              e.content = {__html: Marked(markdown)};
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
