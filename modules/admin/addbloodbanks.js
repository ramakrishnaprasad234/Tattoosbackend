

const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const bloodbankschema = new Schema({
    bloodbank_uuid:{
        type:String,
        required: true,
        unique: true,
        default: uuidv4()
    },
    bloodbank_username: {
        type: String,
        required: true,
    },
    bloodbank_password: {
        type: String,
        required: true,
    },
    bloodbank_code: {
        type: String,
        required: true,
        unique: true,
    },
    bloodbank_name: {
        type: String,
        required: true,
    },
    bloodbank_email: {
        type: String,
        required: true,
    },
    bloodbank_address: {
        type: String,
        required: true,
    },
    bloodbank_area: {
        type: String,
        required: true,
    },
    bloodbank_city: {
        type: String,
    },
    bloodbank_state: {
        type: String,
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    bloodbank_owner_name: {
        type: String
    },
    bloodbank_owner_mobile: {
        type: String
    },
    bloodbank_block_dates: [
        {
            type: String
        }    
    ],
    bloodbank_isActive: {
        type: Boolean,
        default: true
    },
    bloodbank_is_recommended: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

bloodbankschema.index({location:'2dsphere'});

const Bloodbanks = mongoose.model("bloodbanks", bloodbankschema, "bloodbanks");


 module.exports = Bloodbanks

