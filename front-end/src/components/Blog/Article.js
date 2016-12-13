import React from 'react';

export default ({index, article}) =>{
  return <div className='blog-article'
  dangerouslySetInnerHTML={article.content} />;
}
