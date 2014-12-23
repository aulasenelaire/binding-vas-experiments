var DropboxAuth;

DropboxAuth = {
  statics: {
    willTransitionTo: function (transition) {
      // this.props.dropbox_client.authenticate({interactive: false}, function (err, client) {
      //   if (!client.isAuthenticated()) {
      //     transition.redirect('/login');
      //     return;
      //   } else {
      //     console.log('sss');
      //   }
      // });
      // if (!auth.loggedIn()) {
      //   Login.attemptedTransition = transition;
      //   transition.redirect('/login');
      // }
    }
  }
};

module.exports = DropboxAuth;
