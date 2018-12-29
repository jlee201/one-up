const cloudinary = require('cloudinary');
const formidable = require('formidable');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const checkUserVote = require('../middlewares/checkUserVote');
const mongoose = require('mongoose');

const Video = mongoose.model('videos');

module.exports = (app) => {
    app.get('/api/videos_home', async (req, res) => {
        const homeVideos = await Video.find().sort({ upvoteCount: -1 });
        res.send(homeVideos);
    });

    app.get('/api/videos_profile', requireLogin, async (req, res) => {
        const uploadedVideos = await Video.find({
          _user: req.user._id
        });

        const upvotedVideos = await Video.find({
          votedBy: {
            _user: req.user._id,
            response: "Upvote"
          }
        });

        res.send({
          uploadedVideos: uploadedVideos,
          upvotedVideos: upvotedVideos
        });
    });

    // Need to figure out why proxy can't do /api/upvote/:id or anything of that nature
    app.post('/api/upvote:id', requireLogin, checkUserVote, async (req, res) => {
        const video = await Video.findById(req.params.id);
        video.upvoteCount += 1;
        video.votedBy.push({
          _user: req.user._id,
          response: "Upvote"
        })
        await video.save();

        const updatedHomeVideos = await Video.find().sort({ upvoteCount: -1 });
        const updatedUpvoteVideos = await Video.find({
          votedBy: {
            _user: req.user._id,
            response: "Upvote"
          }
        });

        res.send({
          updatedHomeVideos: updatedHomeVideos,
          updatedUpvoteVideos: updatedUpvoteVideos
        });
    });

    app.post('/api/downvote:id', requireLogin, checkUserVote, async (req, res) => {
        const video = await Video.findById(req.params.id);
        video.upvoteCount -= 1;
        video.votedBy.push({
          _user: req.user._id,
          response: "Downvote"
        })
        await video.save();

        const updatedHomeVideos = await Video.find().sort({ upvoteCount: -1 });
        res.send(updatedHomeVideos);
    })

    app.post('/api/upload', requireLogin, (req, res) => {
        new formidable.IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error', err);
            }

            // console.log(files.video.path);

            const uploader = keys.cloudinaryCloudName;

            cloudinary.v2.uploader.upload(
                files.video.path,
                {
                    resource_type: 'video',
                    folder: keys.cloudinaryVideosFolder
                },
                async (error, result) => {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();

                    if (dd < 10) {
                      dd = '0' + dd;
                    }
                    if (mm < 10) {
                      mm = '0' + mm;
                    }

                    today = mm + '/' + dd + '/' + yyyy;

                    const video = await new Video({
                        src: result.url,
                        postedBy: req.user.name,
                        description: fields.title,
                        postedDate: today,
                        _user: req.user._id
                    }).save();

                    res.redirect('/');
                }
            );
        });
    });
};
