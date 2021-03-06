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
// keeps track of whether a user is signed in or not. It is middelware that intercepts the request.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      // user model instance added to req object as 'req.user'
      // then req object is sent to route handler 
      done(null, user);
  });
});

// The callback function will be executed after '/auth/google/callback'
// proxy: true is due to the Google Strategy changing an https request to an 
// http request because a request goes through Heroku's proxy.
passport.use(
    new GoogleStrategy({ 
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id, name: profile.displayName })

      if (existingUser) {
        // done indicates that everything is done, proceed with the authentication process
        // the first argument are any errors that occur, the second argument is the user
        return done(null, existingUser);
      } 
  
      const user = await new User({ googleId: profile.id, name: profile.displayName }).save()
      done(null, user);
    }
  )
);

