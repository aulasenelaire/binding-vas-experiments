/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Router = require('react-router')
  , DropboxAuth = require('../../react-mixins/dropbox-auth.js')
  , DropboxLib = require('../../lib/dropbox.js')
  , Component;

Component = React.createClass({
  mixins: [Router.Navigation, Router.State]
, getInitialState: function () {
    var datastore_id = this.getParams().datastore_id;
    return {};
  }
, render: function() {
    return <div>Data store detail</div>;
  }
});

module.exports = Component;
