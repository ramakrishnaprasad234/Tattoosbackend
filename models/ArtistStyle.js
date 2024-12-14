const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artist_id: {
    type: String,
    required: true,
    unique: true,
  },
  artist_name: {
    type: String,
    required: true,
  },
  artist_bio: {
    type: String,
    // required: true,
  },
  artist_image: {
    type: String, // URL to the image
    required: true,
  },
});

module.exports = mongoose.model('Artists', artistSchema);
