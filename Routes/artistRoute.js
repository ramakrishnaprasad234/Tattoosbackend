const express = require('express');
const { createArtist,getAllArtists,getArtistById,updateArtist,deleteArtist } = require('../Controllers/artist');
const router = express.Router();

router.get("/artist", getAllArtists);
router.get("/:id", getArtistById);
router.post("/artists", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

module.exports = router;
