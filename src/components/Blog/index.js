import React from 'react';
import Article from './Article';
import Marked from 'marked';
require('./style.css');

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
        console.log(this.state.articles)
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
      //Ei toimi!!!
      articles.map((e) => {
        fetch(e.path).then((response) => {
          return response.text();
        }).then((markdown) => {
          e.content = {__html: Marked(markdown)};
          console.log(a)
        });
      });
      console.log(articles)
      this.setState({articles: articles});
    }
    else return;
  }
}
