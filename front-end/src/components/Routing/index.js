import React from 'react';
import {Router, Route, indexRoute, hashHistory} from 'react-router';
import App from '../App';
import Home from '../Home';
import Gallery from '../Gallery';
import Blog from '../Blog';
import Page from '../Page';

const routes = {
  path: '/',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/page/home') },
  childRoutes: [
    { path: ':type', component: Page },
    { path: ':type/:name', component: Page }
  ]
};

export default () => {
    return <div className='app-frame'>
      <Router routes={routes} history={hashHistory} />
    </div>;
}
