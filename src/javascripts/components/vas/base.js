/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , vasTrialsStore = require('../../stores/vas-trials.js')
  , Player = require('./player.js')
  , vas_store
  , VasComponent;

VasComponent = React.createClass({
  getDefaultProps: function() {
    return {
      vasTrialsStore: vasTrialsStore
    };
  }
, getInitialState: function() {
    return {
      trial: vasTrialsStore.getRandomTrial()
    };
  }
, handleChange: function (bar) {
    if (this.state.trial.get('executed')) {
      this.setState({
        trial: this.props.vasTrialsStore.getRandomTrial()
      });
    }
  }
, componentDidUpdate: function () {
    this.state.trial.on('change', this.handleChange);
  }
, componentDidMount: function () {
    this.state.trial.on('change', this.handleChange);
  }
, willComponentUnmount: function () {
    this.state.trial.off('change', this.handleChange);
  }
, render: function() {
    return <Player trial={this.state.trial}></Player>;
  }
});

module.exports = VasComponent;
