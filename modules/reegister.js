
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');


const userSchema = new schema({
    
    user_uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    user_full_name: {
        type: String,
        required: true,
        unique: true,
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
    },
    user_mobile: {
        type: String,
        required: true,
        unique: true,
    },
    user_verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("user", userSchema, "users");
