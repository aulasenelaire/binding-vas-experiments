"use strict";

var Backbone = require("backbone")
  , _ = require("underscore")
  , Dispatcher = require('../dispatcher.js')
  , UiStore;

UiStore = {
  defaults: {
    background_color: 'white'
  }
};

UiStore.initialize = function () {
  _.bindAll(this, 'dispatchCallback');
  this.dispatchToken = Dispatcher.register(this.dispatchCallback);
};

UiStore.dispatchCallback = function (payload) {

  if (payload.actionType === 'ui-change-bg-color') {
    this.set({background_color: payload.background_color});
  } else if (payload.actionType === 'intialize-dropbox') {
    this.set({
      dropbox_client: payload.dropbox_client
    , datastore_manager: payload.datastore_manager
    });
  }
};

UiStore = Backbone.Model.extend(UiStore);
module.exports = new UiStore();
