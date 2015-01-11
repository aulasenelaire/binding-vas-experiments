/** @jsx React.DOM */

"use strict";

var Login
  , $ = require('jquery')
  , Dispatcher = require('../../dispatcher.js')
  , Router = require('react-router')
  , router = require('../../router.js')
  , React = require('react');

Login = React.createClass({
  mixins: [Router.Navigation, Router.State]
, getInitialState: function () {
    return {
      error: false
    , redirect_to: this.getQuery().redirect_to
    };
  }
, makeAuthentication: function (error, client) {
    var self = this;
    client.getAccountInfo(function (err, account_info) {
      Dispatcher.dispatch({
        actionType: 'login_success'
      , dropbox_client: account_info
      , datastore_manager: client.getDatastoreManager()
      , redirect_to: self.state.redirect_to
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
