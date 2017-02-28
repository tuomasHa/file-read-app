var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser');

var articles = {},
articlesPath = 'articles',
articlesRelPath = './files/' + articlesPath;

let parseArticleTree = () =>{
  let tree = dirTree(articlesRelPath, ['.md']);
  fileNameParser(articles, tree, articlesPath);
}

(function(){

    module.exports = {

      init: () =>{
        new Watcher('Articles', articlesRelPath, parseArticleTree);
      },

      updateTree: () =>{
        parseArticleTree();
      },

      getArticles: () =>{
        return articles;
      }
    };
}());
