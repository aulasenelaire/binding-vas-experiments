/** @jsx React.DOM */

"use strict";

var Login
  , $ = require('jquery')
  , Dispatcher = require('../../dispatcher.js')
  , Router = require('react-router')
  , React = require('react');

Login = React.createClass({
  mixins: [Router.Navigation]
, getInitialState: function () {
    return {
      error: false
    };
  }
, makeAuthentication: function (error, client) {
    var self = this;
    client.getAccountInfo(function (err, account_info) {
      return Dispatcher.dispatch({
        actionType: 'intialize-dropbox'
      , dropbox_client: account_info
      , datastore_manager: client.getDatastoreManager()
      });
    });
  }
, handleClick: function (event) {
    window.dropbox.authenticate(this.makeAuthentication);
  }
, render: function () {
    return (<div>
        <button type="button" onClick={this.handleClick}>Accede con Dropbox</button>
      </div>
    );
  }
});

module.exports = Login;
