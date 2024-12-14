const mongoose = require('mongoose');

const tattooStyleSchema = new mongoose.Schema({
  style_id: {
    type: String,
    required: true,
    unique: true,
  },
  style_name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  artist_id: {
    type:String,
     type: mongoose.Schema.Types.ObjectId, // Reference to the Artist
     ref: 'Artist', 
  },
  
});



module.exports = mongoose.model('TattooStyle', tattooStyleSchema);
