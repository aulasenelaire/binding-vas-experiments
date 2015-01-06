/** @jsx React.DOM */

"use strict";

var Home
  , DropboxAuth = require('../../react-mixins/dropbox-auth.js')
  , React = require('react');

Home = React.createClass({
  render: function () {
    return <div>
      <h1>Welcome to home</h1>
    </div>;
  }
});

module.exports = Home;
