var errorLogger = require('./loggers.js').errorLogger;

(function(){
  let parseFileNames = (folder, tree, path, asc, allowSubfolders) => {
    if(tree && tree.name && tree.children && tree.children.length){
      //add new folder
      folder.name = tree.name;
      folder.path = path;
      folder.children = [];
      tree.children.forEach((e)=>{
        let child = {};
        //are subfolders allowed and is the element a non-empty folder
        allowSubfolders && e.children && e.children.length ?
          //allow max 1 level of subfolders
          parseFileNames(child, e, path + '/' + e.name, asc, false) :
          child.name = e.name,
          child.path = path + '/' + e.name;
        folder.children.push(child);
      })
      //Order alpabetically (default desc)
      folder.children.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x > y) return asc ? 1 : -1;
        if(x < y) return asc ? -1 : 1;
        return 0;
      });
    }
    else{
      errorLogger.warn('Folder %s missing', path);
      return;
    }
  };
  module.exports = parseFileNames;
}());
