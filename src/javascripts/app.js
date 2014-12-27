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
  <Route name="app" path="/" handler={App}>
    <Route name="vas" handler={VasComponent}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});
