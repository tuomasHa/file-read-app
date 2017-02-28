var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser'),
pageLogger = require('./loggers').pageLogger;

(function(){

    module.exports = class Pages {

      constructor() {
        this.pages = {};
        this.pagesPath = 'pages';
        this.pagesRelPath = './files/' + this.pagesPath;

        this.updateTree = () => {
          let tree = dirTree(this.pagesRelPath, ['.md']);
          //Ascending order
          fileNameParser(this.pages, tree, this.pagesPath, true);
        }

        this.watcher = new Watcher('Pages', this.pagesRelPath,
         this.updateTree, pageLogger);
      }
    };
}());
