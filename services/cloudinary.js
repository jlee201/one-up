const cloudinary = require('cloudinary');
const keys = require('../config/keys');

// Cloudinary config
cloudinary.config({
	cloud_name: keys.cloudinaryCloudName,
	api_key: keys.cloudinaryKey,
	api_secret: keys.cloudinarySecret
});