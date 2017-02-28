var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser'),
imageLogger = require('./loggers').imageLogger;

(function(){

    module.exports = class Images {

      constructor() {
        this.images = {};
        this.imagesPath = 'img';
        this.imagesRelPath = './files/' + this.imagesPath;

        this.updateTree = () => {
          let tree = dirTree(this.imagesRelPath, ['.jpg', '.png', '.gif', '.json']);
          //descending order, allow subfolders
          fileNameParser(this.images, tree, this.imagesPath, false, true);
        }

        this.watcher = new Watcher('Images', this.imagesRelPath,
          this.updateTree, imageLogger);
      }
    };
}());
