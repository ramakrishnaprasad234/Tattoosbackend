const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    image: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
