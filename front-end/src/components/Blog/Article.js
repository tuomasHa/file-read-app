import React from 'react';

export default ({index, article, linkText}) =>{
  return <div className='blog-article' >
  <a href={'/#/article/' + article.name} className='blog-article-link'
    >{linkText || 'Open'}</a>
  <div className={'blog-article-content'} dangerouslySetInnerHTML={article.content} />
  </div>;
}
