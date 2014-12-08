/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Dispatcher = require('../../dispatcher.js')
  , VasDisplay;

VasDisplay = React.createClass({
  render: function() {
    // duration: <strong>{this.props.trial.get('duration')}</strong>
    // <br />
    // count: <strong>{this.props.trial.get('count')}</strong>
    return (<div className="vas-display">
      <ul className="letters">
        {_.map(this.props.trial.get('letters'), function (letter) {
          return (<li data-position={letter.position}>
            <span>{letter.value.toUpperCase()}</span>
          </li>);
        })}
        <li className="cross">
          <div className="cross-vertical"></div>
          <div className="cross-horizontal"></div>
        </li>
      </ul>
    </div>);
  }
});

module.exports = VasDisplay;

