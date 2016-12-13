//currently only parses the top folder
export default (folder) => {
  if(folder && folder.children && folder.children.length){
    let pages = [];
    folder.children.forEach((e, i, a) => {
      if(!e.children && e.name && e.path){
        let name = e.name;
        if(e.name.indexOf('-') >= 0 && e.name.indexOf('.md')){
          name = e.name.slice(e.name.indexOf('-') + 1, e.name.indexOf('.md'));
        }
        pages.push({name, path: e.path});
      }
    });
    return pages;
  }
  else return [];
}
