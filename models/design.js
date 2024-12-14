const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const designSchema = new mongoose.Schema({
  design_id: {
    type: String,
    default: uuidv4, // Automatically generates a new UUID
    unique: true,    // Ensures the design_id is unique
  },
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist", // Reference to the Artists collection
    required: true,
  },
  style_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TattooStyle", // Reference to the TattooStyles collection
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Design", designSchema);

