const Artist = require('../models/ArtistStyle');

const createArtist = async (req, res) => {
  try {
    const { artist_id, artist_name, artist_bio, artist_image } = req.body;

    const artist = new Artist({
      artist_id,
      artist_name,
      artist_bio,
      artist_image,
    });

    await artist.save();
    res.status(201).json({ message: 'Artist created successfully', artist });
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(400).json({ message: 'Error creating artist', error: error.message });
  }
};


const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get single artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findOne({ artist_id: req.params.id });
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an artist
const updateArtist = async (req, res) => {
  try {
    const updatedArtist = await Artist.findOneAndUpdate(
      { artist_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedArtist) return res.status(404).json({ message: "Artist not found" });
    res.json(updatedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an artist
const deleteArtist = async (req, res) => {
  try {
    const deletedArtist = await Artist.findOneAndDelete({ artist_id: req.params.id });
    if (!deletedArtist) return res.status(404).json({ message: "Artist not found" });
    res.json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createArtist,getAllArtists,getArtistById,updateArtist,deleteArtist };

