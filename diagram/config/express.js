var passport = require('passport') , FacebookStrategy = require('passport-facebook').Strategy , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy, TwitterStrategy = require('passport-twitter').Strategy;


var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function(err, user) {
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function(err, user) {
    done(err, user);
  });
});

/**
 * Configure advanced options for the Express server inside of Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */
module.exports.http = {

  customMiddleware: function(app) {


    passport.use(new FacebookStrategy({
      clientID: "1547685275523005",
      clientSecret: "0a46702382cf313635be9de36f3079a3",
      callbackURL: "http://localhost:1337/auth/facebook/callback"
    }, verifyHandler));

    passport.use(new GoogleStrategy({
      clientID: '237114700416-v4dom27qoe1dg2lu03m39u3ajn1sai9l.apps.googleusercontent.com',
      clientSecret: '4wX6WfkWt5bdZ6x2hj7Wfxoz',
      callbackURL: 'http://localhost:1337/auth/google/callback'
    }, verifyHandler));

    passport.use(new TwitterStrategy({
      consumerKey: ' XbFMxSuJ6se3kLWdNrFfuFNvM',
      consumerSecret: 'LMFji7RAmMSi9lnBAlhDHfHq8EPR7KAi3WCCq2eSTqvMdPqEC4',
      callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback'
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
 };

 module.exports.cache = {

  // The number of seconds to cache files being served from disk
  // (only works in production mode)
  maxAge: 31557600000
};
