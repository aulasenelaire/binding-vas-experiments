/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Dispatcher = require('./dispatcher.js')
  , Router = require('react-router')
  , Routes = Router.Routes
  , Route = Router.Route
  , Link = Router.Link
  , VasComponent = require('./components/vas/base.js')
  , App = require('./components/app.js')
  , routes;

routes = (
  <Routes location="hash">
    <Route name="app" path="/" handler={App}>
      <Route name="vas" handler={VasComponent}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);
