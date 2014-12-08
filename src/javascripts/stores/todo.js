"use strict";

var Backbone = require("backbone")
  , _ = require("underscore")
  , Dispatcher = require('../dispatcher.js')
  , TodoStore
  , TodoItem
  , TodoCollection;

TodoItem = Backbone.Model.extend({});

TodoCollection = Backbone.Collection.extend({
    model: TodoItem
  , url: "/todo"
  , initialize: function () {
      _.bindAll(this, 'dispatchCallback');
      this.dispatchToken = Dispatcher.register(this.dispatchCallback);
    }
  , dispatchCallback: function (payload) {
      var self = this;
      switch(payload.actionType) {
        case 'todo-add':
          self.add(payload.todo);
        case 'todo-delete':
          self.remove(payload.todo);
      }
    }
});

// the Store is an instantiated Collection; a singleton.
TodoStore = new TodoCollection([{title: 'Do something'}]);

module.exports = TodoStore;
