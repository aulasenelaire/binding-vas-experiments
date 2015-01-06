/** @jsx React.DOM */

"use strict";

var Login
  , $ = require('jquery')
  , Router = require('react-router')
  , React = require('react');

Login = React.createClass({
  mixins: [Router.Navigation]
, statics: {
    fetchData: function(params, query) {
      return $.get('/config');
    }
  }
, getInitialState: function () {
    return {
      error: false
    };
  }
, handleClick: function (event) {
    // auth.login(email, pass, function (loggedIn) {
    //   if (!loggedIn)
    //     return this.setState({ error: true });

    //   if (Login.attemptedTransition) {
    //     var transition = Login.attemptedTransition;
    //     Login.attemptedTransition = null;
    //     transition.retry();
    //   } else {
    //     this.replaceWith('/about');
    //   }
    // }.bind(this));
  }
, render: function () {
    return (<div>
        <button type="button" onClick={this.handleClick}>Accede con Dropbox</button>
      </div>
    );
  }
});

module.exports = Login;
