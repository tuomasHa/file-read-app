var dirTree = require('directory-tree'),
fs = require('fs'), //file-system
fileNameParser = require('./fileNameParser');

var images = {},
imagesPath = 'img',
imagesRelPath = './files/' + imagesPath,
filteredTree;

(function(){

    module.exports = {

      init: () =>{
        parseTree();
        fs.watch(imagesRelPath, (eventType, filename) =>{
          if(filename){
            console.log('Images: File ' + filename + ' changed');
            parseTree();
          } //TODO: else deal with error
        });
      },

      updateTree: () =>{
        parseTree();
      },

      getImages: () =>{
        return images;
      },

      getPath: () =>{
        return imagesRelPath;
      }
    };
}());

parseTree = () =>{
  let tree = dirTree(imagesRelPath, ['.jpg', '.png', '.gif', '.json']);
  //descending order, allow subfolders
  fileNameParser(images, tree, imagesPath, false, true);
}
