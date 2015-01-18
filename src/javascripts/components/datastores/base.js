/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Router = require('react-router')
  , Link = Router.Link
  , RouteHandler = Router.RouteHandler
  , _ = require("underscore")
  , DropboxAuth = require('../../react-mixins/dropbox-auth.js')
  , DropboxLib = require('../../lib/dropbox.js')
  , Component;

Component = React.createClass({
  mixins: [DropboxAuth]
, render: function() {
    return <div>
      <RouteHandler {...this.props} />
    </div>;
  }
});

module.exports = Component;
