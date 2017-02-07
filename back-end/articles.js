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

        //recursive-option only works on windows and osx
        fs.watch(articlesRelPath, {recursive: true}, (eventType, filename) =>{
          if(filename){
            console.log('Articles: File ' + filename + ' changed');
            parseArticleTree();
          } //TODO: else deal with error
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
