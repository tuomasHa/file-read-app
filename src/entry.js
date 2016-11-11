import React from 'react';
import {render} from 'react-dom';
import Promise from 'es6-promise';
Promise.polyfill(); //Promise API polyfill for 1e9+
import 'whatwg-fetch'; //Fetch API polyfill for ie 10+
import Gallery from './components/Gallery';
import Blog from './components/Blog';

const root = document.body.appendChild(document.createElement('div'));

render(
  <div className='react-app'>
    {/*<Gallery />*/}
    <Blog />
  </div>,
  root
);
