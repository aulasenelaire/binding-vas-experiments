/** @jsx React.DOM */

"use strict";

var React = require('react')
  , NotFound;

NotFound = React.createClass({
  render: function () {
    return <h1>404 Not Found</h1>;
  }
});

module.exports = NotFound;
