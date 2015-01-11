"use strict";

var _ = require("underscore")
  , when = require('when')
  , _dropbox  = null;

/*
 * Initialize dropbox API with dropbox_key from your server
 * This method return a Promise. This way you can chain it on
 * application data bootstraping.
 *
 * @return {Promise}
 */
function initializeDropbox (promise_response) {
  var dropbox
    , credentials = getDropboxAccessToken()
    , dropbox_app_key
    , deferred = when.defer();

  if (!promise_response || !promise_response[0].dropbox_key) {
    console.log('You must set your dropbox key in your server');
  }

  dropbox_app_key = promise_response[0].dropbox_key

  if (credentials) {
    _.extend(credentials, {key: dropbox_app_key});
  } else {
    credentials = {key: dropbox_app_key};
  }

  _dropbox = initializeDropboxFromCredentials(credentials);

  _.extend(promise_response, {dropbox: _dropbox});
  deferred.resolve(promise_response);

  return deferred.promise;
}

/*
 * Use this method to get from dropbox user info
 * This only works when user is authenticated
 *
 * @return {Promise}
 */
function getAccountInfo (promise_response) {
  var dropbox = promise_response.dropbox || getClient()
    , deferred = when.defer();

  if (dropbox.isAuthenticated()) {
    dropbox.getAccountInfo(function (error, account_info) {
      _.extend(promise_response, {account_info: account_info});
      deferred.resolve(promise_response);
    });
  } else {
    deferred.resolve(promise_response);
  }

  return deferred.promise;
}

/*
 * Wrap native dropbox.authenticate method with a Promise
 *
 * @return {Object} options
 * @return {Promise}
 */
function authenticate (options) {
  var dropbox = getClient()
    , deferred = when.defer();

  dropbox.authenticate(function (error, dropbox) {
    deferred.resolve({dropbox: dropbox});
  });
  return deferred.promise;
}

/**
 * This is a singleton to return dropbox
 * client initialzed if present.
 *
 * @return {DropboxClientInstance}
 */
 function getClient () {
  return _dropbox;
};

exports.initializeDropbox = initializeDropbox;
exports.getAccountInfo = getAccountInfo;
exports.authenticate = authenticate;
exports.getClient = getClient;

/**
 * ***************
 * Private methods
 * ***************
 */

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
