/** @jsx React.DOM */
'use strict';

var React = require('react')
  , Router = require('react-router')
  , all = require('when/keys').all
  , _ = require('underscore')
  , $ = require('jquery')
  , Router = require('react-router')
  , Route = Router.Route
  , uiStore = require('./stores/ui.js')
  , routes = require('./routes.js')
  , router = require('./router.js')
  , renderState
  , boostrap
  , render;

renderState = {
  element: document.getElementById('app')
, Handler: null
, routerState: null
};

/**
 * Fetch async data on each component. Resolve promises
 *
 * @param {ReactRouter} routes
 * @param {Hash} params
 */
function fetchData (routerState) {
  var { params, query } = routerState;
  return all(routerState.routes.filter(function (route) {
    return route.handler.fetchData;
  }).reduce(function (promises, route) {
    promises[route.name] = route.handler.fetchData(params, query);
    return promises;
  }, {}));
};

/**
 * Render react app with router in async mode
 */
function render () {
  var { element, Handler, routerState } = renderState;
  uiStore.trigger('loadStart');
  fetchData(routerState).then(function (data) {
    uiStore.trigger('loadEnd');
    React.render(<Handler data={data} uiStore={uiStore} />, element);
  });
};

/**
 * Fetch data from server first and then load application
 */
all([$.get('/config')]).then(function (results) {
  // Initialize Dropbox data stores API with your API key from
  // Sinatra server app
  window.dropbox = new Dropbox.Client({key: results[0].dropbox_key});
  window.dropbox.authDriver(new Dropbox.AuthDriver.Popup({
    receiverUrl: window.location.origin + '/drobox_oauth_receiver'
  }));

  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    renderState.Handler = Handler;
    renderState.routerState = state;
    render();
  });
});
