var dirTree = require('directory-tree'),
fs = require('fs'), //file-system
fileNameParser = require('./fileNameParser');

var pages = {},
pagesPath = 'pages',
pagesRelPath = './files/' + pagesPath,
filteredTree;

(function(){

    module.exports = {

      init: () =>{
        parsePageTree();

        //recursive-option only works on windows and osx
        fs.watch(pagesRelPath, {recursive: true}, (eventType, filename) =>{
          if(filename){
            console.log('Pages: File ' + filename + ' changed');
            parsePageTree();
          } //TODO: else deal with error
        });
      },

      updateTree: () =>{
        parsePageTree();
      },

      getPages: () =>{
        return pages;
      },

      getPath: () =>{
        return pagesRelPath;
      }
    };
}());

parsePageTree = () =>{
  //tree = dirTree('./files');
  let tree = dirTree(pagesRelPath, ['.md']);
  fileNameParser(pages, tree, pagesPath, true); //Ascending order
}
