/** @jsx React.DOM */
'use strict';

var React = require('react')
  , Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , NotFoundRoute = Router.NotFoundRoute;

module.exports = (
  <Route name="app" path="/" handler={require('./components/app.js')}>
    <DefaultRoute handler={require('./components/common/home.js')}/>
    <Route name='login' handler={require('./components/common/login.js')}/>
    <Route name='vas' handler={require('./components/vas/base.js')}/>
    <Route name='datastores' path='/datastores' handler={require('./components/datastores/base.js')}>
      <DefaultRoute name="ds-list" handler={require('./components/datastores/list.js')}/>
      <Route name='ds-detail' path=":datastore_id" handler={require('./components/datastores/detail.js')} />
    </Route>
    <NotFoundRoute handler={require('./components/common/not-found.js')}/>
  </Route>
);
