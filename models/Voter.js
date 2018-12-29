const mongoose = require('mongoose');
const { Schema } = mongoose;

const voterSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    response: String
});

mongoose.model('voters', voterSchema);
