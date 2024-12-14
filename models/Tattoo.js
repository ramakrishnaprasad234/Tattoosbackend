// models/Tattoo.js
const mongoose = require('mongoose');

const TattooSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },

  image: { 
    type: String, 
    required: true },

  price: { 
    type: Number, 
    required: true },

  date: { 
    type: Date,
     required: true },

  time: { 
    type: String, 
    required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tattoo', TattooSchema);
