/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Screenfull = require('screenfull')
  , Dispatcher = require('../../dispatcher.js')
  , FluxBone = require('../../react-mixins/flux-bone.js')
  , vasTrialsStore = require('../../stores/vas-trials.js')
  , VasDisplay = require('./display.js')
  , VasQuestion = require('./question.js')
  , VasComponent;

VasComponent = React.createClass({
  mixins: [FluxBone('vasTrialsStore')]
, getDefaultProps: function () {
    return {
      vasTrialsStore: vasTrialsStore
    , trial: vasTrialsStore.getRandomTrial()
    };
  }
, getInitialState: function() {
    return {
      display: true
    , display_cross_time: 200
    };
  }
, componentDidMount: function () {
    document.getElementById('button-full-screen').addEventListener('click', function () {
      if (Screenfull.enabled) {
        Screenfull.request();
      }
    });
    var self = this;
    _.delay(function () {
      self.setState({display: false});
    }, self.props.trial.get('duration') + self.state.display_cross_time);
  }
, render: function() {
    var component;

    if (!this.props.trial) {
      component = <div>NO more trials</div>;
    } else if (this.state.display) {
      component = <VasDisplay trial={this.props.trial} display_cross_time={this.state.display_cross_time}></VasDisplay>;
    } else {
      component = <VasQuestion trial={this.props.trial}></VasQuestion>;
    }

    return component;
  }
});

module.exports = VasComponent;
