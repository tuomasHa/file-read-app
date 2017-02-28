var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser');

(function(){

    module.exports = class Articles {

      constructor() {
        this.articles = {};
        this.articlesPath = 'articles';
        this.articlesRelPath = './files/' + this.articlesPath;

        this.updateTree = () => {
          let tree = dirTree(this.articlesRelPath, ['.md']);
          fileNameParser(this.articles, tree, this.articlesPath);
        }

        this.watcher = new Watcher('Articles', this.articlesRelPath, this.updateTree);
      }
    };
}());
