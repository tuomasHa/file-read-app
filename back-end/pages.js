var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser');

(function(){

    module.exports = class Pages {

      constructor() {
        this.pages = {};
        this.pagesPath = 'pages';
        this.pagesRelPath = './files/' + this.pagesPath;

        this.updateTree = () => {
          let tree = dirTree(this.pagesRelPath, ['.md']);
          fileNameParser(this.pages, tree, this.pagesPath, true); //Ascending order
        }

        this.watcher = new Watcher('Pages', this.pagesRelPath, this.updateTree);
      }
    };
}());
