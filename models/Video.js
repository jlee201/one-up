const mongoose = require('mongoose');
const { Schema } = mongoose;
const VoterSchema = require('./Voter');

const videoSchema = new Schema({
    src: String,
    postedBy: String,
    description: String,
    postedDate: String,
    votedBy: { type: [VoterSchema], default: [] },
    upvoteCount: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('videos', videoSchema);
