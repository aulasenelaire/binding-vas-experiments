/** @jsx React.DOM */
'use strict';

var React = require('react')
  , all = require('when/keys').all
  , _ = require('underscore')
  , $ = require('jquery')
  , DropboxLib = require('./lib/dropbox.js')
  , uiStore = require('./stores/ui.js')
  , router = require('./router.js')
  , renderState;

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
all([$.get('/config')])
.then(DropboxLib.initializeDropbox)
.then(DropboxLib.getAccountInfo)
.then(function (promise_response) {

  uiStore.set({
    dropbox_client: promise_response.account_info
  });

  router.run(function (Handler, state) {
    renderState.Handler = Handler;
    renderState.routerState = state;
    render();
  });
});
