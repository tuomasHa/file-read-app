import React from 'react';

export default ({index, image}) =>{
  return <div className='gallery-image-container'>
    <img className='gallery-image' src={image.path} alt={image.name} />
  </div>;
}
