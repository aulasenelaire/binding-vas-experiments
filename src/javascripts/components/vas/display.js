/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Dispatcher = require('../../dispatcher.js')
  , VasDisplay;

VasDisplay = React.createClass({
  getInitialState: function() {
    return {
      display_only_cross: true
    };
  }
, componentDidMount: function () {
    var self = this;
    _.delay(function () {
      self.setState({display_only_cross: false});
    }, self.props.display_cross_time);
  }
, render: function() {
    var letters;

    if (!this.state.display_only_cross) {
      letters = _.map(this.props.trial.get('letters'), function (letter, index) {
        return (<li data-position={letter.position} key={index}>
          <span>{letter.value.toUpperCase()}</span>
        </li>);
      });
    }

    return (<div className="vas-display">
      <ul className="letters">

        {letters}
        <li className="cross">
          <div className="cross-vertical"></div>
          <div className="cross-horizontal"></div>
        </li>
      </ul>
    </div>);
  }
});

module.exports = VasDisplay;

