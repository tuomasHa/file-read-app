var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser');

var images = {},
imagesPath = 'img',
imagesRelPath = './files/' + imagesPath;

let parseImageTree = () =>{
  let tree = dirTree(imagesRelPath, ['.jpg', '.png', '.gif', '.json']);
  //descending order, allow subfolders
  fileNameParser(images, tree, imagesPath, false, true);
}

(function(){

    module.exports = {

      init: () =>{
        new Watcher('Images', imagesRelPath, parseImageTree);
      },

      updateTree: () =>{
        parseImageTree();
      },

      getImages: () =>{
        return images;
      }
    };
}());
