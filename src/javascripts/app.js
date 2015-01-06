/** @jsx React.DOM */
'use strict';

var React = require('react')
  , Router = require('react-router')
  , when = require('when')
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
 * Get dropbox access token if present in localStorage
 *
 * @return {Object}
 */
function getDropboxAccessToken () {
  var dropbox_key;
  dropbox_key = _.find(_.keys(localStorage), function (key) {
    return /^dropbox-auth:default:/.test(key);
  });

  if (dropbox_key) {
    return JSON.parse(localStorage.getItem(dropbox_key));
  }
};

/**
 * Initialize Dropbox API from credentials
 *
 * @param {Object} credentials
 * @return {DropboxClientInstance}
 */
function initializeDropboxFromCredentials (credentials) {
  var dropbox = new Dropbox.Client(credentials);
  dropbox.authDriver(new Dropbox.AuthDriver.Popup({
    receiverUrl: window.location.origin + '/drobox_oauth_receiver'
  }));
  return dropbox;
};

/**
 * Fetch data from server first and then load application
 */
all([$.get('/config')]).then(function (results) {
  var dropbox
    , credentials = getDropboxAccessToken()
    , dropbox_app_key
    , deferred = when.defer();

  if (!results || !results[0].dropbox_key) {
    console.log('You must set your dropbox key in your server');
  }

  dropbox_app_key = results[0].dropbox_key

  if (credentials) {
    _.extend(credentials, {key: dropbox_app_key});
  } else {
    credentials = {key: dropbox_app_key};
  }

  dropbox = initializeDropboxFromCredentials(credentials);

  if (dropbox.isAuthenticated()) {
    dropbox.getAccountInfo(function (error, account_info) {
      deferred.resolve({
        account_info: account_info
      , dropbox: dropbox
      });
    });
  } else {
    deferred.resolve({
      dropbox: dropbox
    });
  }

  // Return only the promise, so that the caller cannot
  // resolve, reject, or otherwise muck with the original deferred.
  return deferred.promise;
}).then(function (dropbox_instance) {
  // This is needed in dropbox-auth.js mixin
  // TODO: find a better way to save global state
  window.dropbox = dropbox_instance.dropbox;

  // If user is authenticated we store it in UI store
  if (!!dropbox_instance.account_info) {
    uiStore.set({
      dropbox_client: dropbox_instance.account_info
    , datastore_manager: dropbox_instance.dropbox.getDatastoreManager()
    });
  }

  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    renderState.Handler = Handler;
    renderState.routerState = state;
    render();
  });
});
