const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Video');
require('./services/passport');
require('./services/cloudinary');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

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

// Include videoRoutes handler
require('./routes/videoRoutes')(app);

// Include profileRoutes handler
require('./routes/profileRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000; 
app.listen(PORT);