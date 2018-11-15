const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// create identifying piece of data, and put into user's cookie
// executed after Google Strategy callback below. 
// user is pulled from the done object returned from the google strategy
passport.serializeUser((user, done) => {
  // user.id or the second argument is the identifying piece of information that will be placed in cookie
  // the id is the id from mLab, NOT the google Id
  done(null, user.id);
});

// take identifying piece of information from user's cookie, and turn it into a user 
// or a mongo model instance.
// executed when the client makes ANY request to the server,
// keeps track of whether a user is signed in or not
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      // user model instance added to req object as 'req.user'
      // then req object is sent to route handler 
      done(null, user);
  });
});

// The callback function will be executed after '/auth/google/callback'
passport.use(
  new GoogleStrategy({ 
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          // done indicates that everything is done, proceed with the authentication process
          // the first argument are any errors that occur, the second argument is the user
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

