import React from 'react';

export default ({index, image}) =>{
  return <img className='gallery-image' src={image.path} alt={image.name} />;
}
