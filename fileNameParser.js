(function(){
  module.exports = (folder, tree, path) => {
    if(tree.name && tree.children && tree.children.length){
      //add new folder
      folder.name = tree.name;
      folder.path = path;
      folder.children = [];
      tree.children.forEach((e)=>{
        let child = {};
        //is element a folder
        e.children ?
          parseFileNames(child, e.children) :
          child.name = e.name,
          child.path = path + '/' + e.name;
        folder.children.push(child);
      })
      //make sure images are alphabetically ordered (desc)
      folder.children.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x > y) return -1;
        if(x < y) return 1;
        return 0;
      });
    }
    else{
      return;
    }
  };
}());
