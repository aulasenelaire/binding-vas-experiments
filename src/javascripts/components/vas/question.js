/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Dispatcher = require('../../dispatcher.js')
  , VasQuestion;

VasQuestion = React.createClass({
  componentDidMount: function() {
    var question = this.refs.question;
    question.getDOMNode().focus();
  }
, render: function() {
    return (<div className="full-expanded vas-question">
        <div className="vas-question-input">
          <input ref="question" type="text" placeholder="¿Qué letras has visto?" />
        </div>
      </div>);
  }
});

module.exports = VasQuestion;

