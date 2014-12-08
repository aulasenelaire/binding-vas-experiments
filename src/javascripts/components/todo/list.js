/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Dispatcher = require('../../dispatcher.js')
  , FluxBone = require('../../react-mixins/flux-bone.js')
  , TodoItem = require('./item.js')
  , TodoStore = require('../../stores/todo.js')
  , TodoListComponent;

TodoListComponent = React.createClass({
  mixins: [FluxBone('TodoStore')]
, addItem: function() {
    return Dispatcher.dispatch({
      actionType: 'todo-add'
    , todo: {title: 'fooo bar'}
    });
  }
, getDefaultProps: function () {
    return {
      TodoStore: TodoStore
    };
  }
, render: function() {
    var items = this.props.TodoStore.models.map(function (todoItem) {
      return <TodoItem key={todoItem.cid} todoItem={todoItem}></TodoItem>;
    });

    return (
      <div>
        <ul>
          {items}
        </ul>
        <a href="#" onClick={this.addItem}>Add item</a>
      </div>
    );
  }
});

module.exports = TodoListComponent;
