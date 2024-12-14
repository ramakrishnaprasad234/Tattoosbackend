const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp_user_uuid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otp_number: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 } // OTP expires in 5 minutes
});

module.exports = mongoose.model('Otp', otpSchema);
