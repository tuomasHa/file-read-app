var dirTree = require('directory-tree'),
Watcher = require('./watcher'),
fileNameParser = require('./fileNameParser');

var pages = {},
pagesPath = 'pages',
pagesRelPath = './files/' + pagesPath;

let parsePagesTree = () =>{
  let tree = dirTree(pagesRelPath, ['.md']);
  fileNameParser(pages, tree, pagesPath, true); //Ascending order
}

(function(){

    module.exports = {

      init: () =>{
        new Watcher('Pages', pagesRelPath, parsePagesTree)
      },

      updateTree: () =>{
        parsePagesTree();
      },

      getPages: () =>{
        return pages;
      }
    };
}());
