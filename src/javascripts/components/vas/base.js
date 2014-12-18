/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Dispatcher = require('../../dispatcher.js')
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
    if (!!this.state.trial) {
      this.state.trial.on('change', this.handleChange);
    }
  }
, componentDidMount: function () {
    if (!!this.state.trial) {
      this.state.trial.on('change', this.handleChange);
    }
    Dispatcher.dispatch({
      actionType: 'ui-change-bg-color'
    , background_color: 'black'
    });
  }
, willComponentUnmount: function () {
    if (!!this.state.trial) {
      this.state.trial.off('change', this.handleChange);
    }
  }
, render: function() {
    return (<Player trial={this.state.trial} trials={this.props.vasTrialsStore}></Player>);
  }
});

module.exports = VasComponent;
