/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Dispatcher = require('../../dispatcher.js')
  , TodoItem;


TodoItem = React.createClass({
  handleTodoDelete: function() {
    return Dispatcher.dispatch({
      actionType: 'todo-delete'
    , todo: this.props.todoItem
    });
  }
, render: function() {
    return (
      <li>
        {this.props.todoItem.get('title')}
        <button onClick={this.handleTodoDelete}>Delete me</button>
      </li>
    );
  }
});

module.exports = TodoItem;
