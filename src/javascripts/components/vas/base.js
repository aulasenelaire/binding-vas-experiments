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
    var executed_list = _.sortBy(this.props.vasTrialsStore.where({executed: true}), function (trial) {return trial.get('executed_time')})
      , executed = this.props.vasTrialsStore.where({executed: true}).length
      , all_ok = this.props.vasTrialsStore.where({all_ok: true}).length
      , all = this.props.vasTrialsStore.length;
    return (<div>
      executed: <span>{executed}/{all}</span><br />
      All ok: <span>{all_ok}</span>
      <Player trial={this.state.trial}></Player>
    </div>);
  }
});

module.exports = VasComponent;
