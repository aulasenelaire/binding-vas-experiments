"use strict";

var Backbone = require("backbone")
  , _ = require("underscore")
  , Dispatcher = require('../dispatcher.js')
  , uiStore;

uiStore = Backbone.Model.extend({
  defaults: function () {
    return {
      background_color: 'white'
    };
  }
  , initialize: function () {
      _.bindAll(this, 'dispatchCallback');
      this.dispatchToken = Dispatcher.register(this.dispatchCallback);
    }
  , dispatchCallback: function (payload) {
      var self = this;
      switch(payload.actionType) {
        case 'ui-change-bg-color':
          self.set({background_color: payload.background_color});
      }
    }
});

module.exports = new uiStore();
