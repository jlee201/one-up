const cloudinary = require('cloudinary');
const formidable = require('formidable');
const keys = require('../config/keys');

module.exports = (app) => {
    app.post('/api/edit_profile', (req, res) => {
        new formidable.IncomingForm().parse(req, async (err, fields, files) => {
            if (fields.bio) {
                req.user.bio = fields.bio;
            }

            if (files.picture.name) {
                const uploader = keys.cloudinaryCloudName;

                await cloudinary.v2.uploader.upload(
                    files.picture.path,
                    {
                        resource_type: 'image',
                        folder: keys.cloudinaryImagesFolder
                    },
                    (error, result) => {
                        req.user.profilePictureSRC = result.url;
                    }
                )
            }

            await req.user.save();

            res.redirect('/profile');
        });
    });
};
