'use strict';
module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query) {
      window.dropbox.authenticate({interactive: false}, function (err, client) {
        if (!client.isAuthenticated()) {
          transition.redirect('/login');
          return;
        }
      });
    }
  }
};
