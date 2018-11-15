const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});


// First argument is name of collection, second argument is the schema
// Creates a collection of users
mongoose.model('users', userSchema);