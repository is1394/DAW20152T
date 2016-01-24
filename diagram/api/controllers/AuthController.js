
var passport = require('passport');

module.exports = {


  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },


  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  facebook: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }
        req.session.user = user.name;
        res.redirect('/profile');
        return;
      });
    })(req, res);
  },

  // https://developers.google.com/
  // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
  google: function(req, res) {
      passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }, function(err, user) {
        req.logIn(user, function(err,user) {
          if (err) {
            console.log(err);
            res.view('500');
            return;
          }

          res.redirect('/');
          return;
        });
      })(req, res);
    },

  // https://apps.twitter.com/
  // https://apps.twitter.com/app/new
  twitter: function(req, res) {
    passport.authenticate('twitter', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  }
};
