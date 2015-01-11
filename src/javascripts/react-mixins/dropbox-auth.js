'use strict';

var DropboxLib = require('../lib/dropbox.js');

module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, state) {
      var dropbox = DropboxLib.getClient();
      if (!dropbox.isAuthenticated()) {
        transition.redirect('/login', {}, {redirect_to: transition.path});
      }
    }
  }
};
