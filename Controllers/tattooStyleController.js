const TattooStyle = require('../models/TattooStyle');
const Artist = require('../models/ArtistStyle');

const createTattooStyle = async (req, res) => {
  try {
    const { style_id, style_name, image,price,artist_id } = req.body;
    // console.log(style_id, style_name, image,price, artist_name)

    // Check if the artist exists
    const artistExists = await Artist.findOne({ artist_id });
    if (!artistExists) {
      return res.status(404).json({ message: 'Artist not found' });
      
    }
    

    const tattooStyle = new TattooStyle({
      style_id,
      style_name,
      image,
      price,
      artist_id
       // artist: artistExists._id, // Reference the artist's ObjectId
      
    });
    console.log(tattooStyle)

    await tattooStyle.save();
    res.status(201).json({ message: 'Tattoo style created successfully', tattooStyle });
  } catch (error) {
    console.error('Error creating tattoo style:', error);
    res.status(400).json({ message: 'Error creating tattoo style', error: error.message });
  }
};


const getAllTattooStyles = async (req, res) => {
  try {
    const tattooStyles = await TattooStyle.find().populate('artist_id'); // Populate artist details
    res.status(200).json(tattooStyles);
  } catch (error) {
    console.error('Error fetching tattoo styles:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { createTattooStyle,getAllTattooStyles };
