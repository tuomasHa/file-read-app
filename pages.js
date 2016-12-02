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
        console.log(pages);

        //recursive-option only works on windows and osx
        fs.watch(pagesRelPath, {recursive: true}, (eventType, filename) =>{
          if(filename){
            console.log('Page ' + filename + ' changed');
            parsePageTree();
            console.log(pages);
          }
        });
      },

      updateTree: () =>{
        parsePageTree();
        console.log(pages);
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
  fileNameParser(pages, tree, pagesPath);
}
