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
        console.log(images);

        //recursive-option only works on windows and osx
        fs.watch(imagesRelPath, {recursive: true}, (eventType, filename) =>{
          if(filename){
            console.log('Image ' + filename + ' changed');
            parseTree();
            console.log(images);
          }
        });
      },

      updateTree: () =>{
        parseTree();
        console.log(images);
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
  //tree = dirTree('./files');
  let tree = dirTree(imagesRelPath, ['.jpg', '.png']);
  console.log(tree)
  fileNameParser(images, tree, imagesPath);
}
