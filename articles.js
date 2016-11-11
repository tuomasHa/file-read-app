var dirTree = require('directory-tree'),
fs = require('fs'), //file-system
fileNameParser = require('./fileNameParser');

var articles = {},
articlesPath = 'articles',
articlesRelPath = './files/' + articlesPath,
filteredTree;

(function(){

    module.exports = {

      init: () =>{
        parseArticleTree();
        console.log(articles);

        //recursive-option only works on windows and osx
        fs.watch(articlesRelPath, {recursive: true}, (eventType, filename) =>{
          if(filename){
            console.log('Article ' + filename + ' changed');
            parseArticleTree();
            console.log(articles);
          }
        });
      },

      updateTree: () =>{
        parseArticleTree();
        console.log(articles);
      },

      getArticles: () =>{
        return articles;
      },

      getPath: () =>{
        return articlesRelPath;
      }
    };
}());

parseArticleTree = () =>{
  //tree = dirTree('./files');
  let tree = dirTree(articlesRelPath, ['.md']);
  fileNameParser(articles, tree, articlesPath);
}
