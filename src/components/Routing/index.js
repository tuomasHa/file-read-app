import React from 'react';
import {Router, Route, indexRoute, hashHistory} from 'react-router';
import App from '../App';
import Home from '../Home';
import Gallery from '../Gallery';
import Blog from '../Blog';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'gallery', component: Gallery },
    { path: 'blog', component: Blog },
  ]
};

export default () => {
    return <div className='app-frame'>
      <Router routes={routes} history={hashHistory} />
    </div>;
}