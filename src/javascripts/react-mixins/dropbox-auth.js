'use strict';
module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, state) {
      if (!window.dropbox.isAuthenticated()) {
        transition.redirect('/login');
        return;
      }
    }
  }
};
