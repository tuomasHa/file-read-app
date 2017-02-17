/**
  * Injects embedded youtube video iframe to custom video tags in html string
  * Video tag format example: !VIDEO(title:"video title" width:"560" height:"315" id:"dQw4w9WgXcQ")
  * Generated tag example: <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
  */

const extractProperty = (string, prop) => {
  let propStr = prop + ':\"';
  let start = string.indexOf(propStr);
  let value = '';
  if (start !== -1) {
    let end = string.indexOf('\"', start + propStr.length);
    if (end !== -1) {
      value = string.slice(start + propStr.length, end);
    }
  }
  return value;
}

export default (htmlString) => {
  let currentIndex = 0;
  let startIndex = 0;

  //while video tags can be found
  while (startIndex !== -1) {
    let iframe = '';
    startIndex = htmlString.indexOf('!VIDEO(', currentIndex);
    currentIndex = startIndex;
    //if video tag was found
    if (currentIndex !== -1) {
      currentIndex = htmlString.indexOf(')', currentIndex) + 1;
      let tag = htmlString.slice(startIndex, currentIndex);
      tag = tag.replace(/&quot;/g, '\"');
      let title = extractProperty(tag, 'title') || 'video';
      let width = extractProperty(tag, 'width') || '560';
      let height = extractProperty(tag, 'height') || '315';
      let id = extractProperty(tag, 'id');
      iframe = id ? '<iframe width=\"' + width + '\" height=\"' + height +
        '\" src=\"https://www.youtube.com/embed/' + id +
        '\" frameborder=\"0\" allowfullscreen>'+ title + '</iframe>' : '';
    }
    if (iframe) {
      htmlString = htmlString.slice(0, startIndex) + iframe + htmlString.slice(currentIndex);
    }
  }
  return htmlString;
}
