const mongoose = require('mongoose');
const Video = mongoose.model('videos');

module.exports = async (req, res, next) => {
	const video = await Video.findById(req.params.id);

	// need to figure out more efficient way to determine if user has voted on video
	for (var i = 0; i < video.votedBy.length; i++) {
		if (video.votedBy[i]._user.$oid == req.user._id.$oid) {
			return res.status(401).send({ error: 'You already voted on this video!' });
		}
	}

	next();
}