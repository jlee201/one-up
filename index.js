const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// give us access to cookies and make use of them 
// cookieSession extracts cookie data after a request comes in, 
// then sends the data to Passport
app.use(
  cookieSession({
    // maxAge is how long the cookie exists before it expires
    // keys will encrypt the cookie so it doesn't reveal the identifying piece of information
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tell Passport to make use of cookies to handle authentication 
app.use(passport.initialize());
app.use(passport.session());

// Include authRoutes handler
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; 
app.listen(PORT);