/** @jsx React.DOM */

"use strict";

var Login
  , React = require('react')
  , $ = require('jquery')
  , Dispatcher = require('../../dispatcher.js')
  , Router = require('react-router')
  , DropboxLib = require('../../lib/dropbox.js');

Login = React.createClass({
  mixins: [Router.Navigation, Router.State]
, getInitialState: function () {
    return {
      error: false
    , redirect_to: this.getQuery().redirect_to
    };
  }
, onLoginWithDropbox: function (event) {
    var redirect_to = this.state.redirect_to;
    DropboxLib.authenticate()
    .then(DropboxLib.getAccountInfo)
    .then(function (promise_response) {
      Dispatcher.dispatch({
        actionType: 'login_success'
      , dropbox_client: promise_response.account_info
      , redirect_to: redirect_to
      });
    });
  }
, render: function () {
    return (<div>
        <button type="button" onClick={this.onLoginWithDropbox}>Accede con Dropbox</button>
      </div>
    );
  }
});

module.exports = Login;
