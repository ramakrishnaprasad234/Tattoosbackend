const mongoose = require("mongoose")
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const salonSchema = new schema({
    shop_uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4()
    },
    shop_username: {
        type: String,
        required: true,
    },
    shop_password: {
        type: String,
        required: true,
    },
    shop_code: {
        type: String,
        required: true,
        unique: true,
    },
    shop_name: {
        type: String,
        required: true,
    },
    shop_email: {
        type: String,
        required: true,
    },
    shop_description: {
        type: String
    },
    shop_type: {
        type: String,
        required: true
    },
    shop_address: {
        type: String,
        required: true,
    },
    shop_area: {
        type: String,
        required: true,
    },
    shop_city: {
        type: String,
    },
    shop_state: {
        type: String,
    },
    location: {
        type: { type: String },
        coordinates: []
    },
   /* salon_slots: {
        type: String,
        required: true,
    },
    salon_services: [
        {
            service_name: {
                type: String,
                required: true
            },
            service_discount: {
                type: String
            },
            service_original_price: {
                type: String,
                required: true
            },
            service_duration: {
                type: String,
                required: true
            }
        }
    ],
    salon_combo_services: [
        {   
            combo_name: {
                type: String,
                required: true
            },
            combo_services_name: [
                {
                    type: String,
                    required: true
                }
            ],
            combo_price: {
                type: String,
                required: true
            },
            combo_duration: {
                type: String,
                required: true
            }
        }
    ],
    salon_opening_time: {
        type: String,
        required: true,
    },
    salon_closing_time: {
        type: String,
        required: true,
    },
    salon_lunch_start_time: {
        type: String,
        required: true,
    },
    salon_lunch_end_time: {
        type: String,
        required: true,
    },
    salon_photos: [{
        type: String
    }],
    salon_features:
    {
        feature_wifi: {
            type: Boolean,
            default: false
        },
        feature_parking: {
            type: Boolean,
            default: false
        },
        feature_AC: {
            type: Boolean,
            default: false
        }
    },

    salon_languages:
    {
        language_hindi: {
            type: Boolean,
            default: false
        },
        language_english: {
            type: Boolean,
            default: false
        },
        language_telugu: {
            type: Boolean,
            default: false
        },
    } */
    
    shop_owner_name: {
        type: String
    },
    shop_owner_mobile: {
        type: String
    },
    /*salon_owner_pancard_number: {
        type: String,
        required: true
    },
    salon_bank_name: {
        type: String,
        required: true
    },
    salon_bank_account_number: {
        type: String,
        required: true
    },
    salon_bank_IFSC_code: {
        type: String,
        required: true
    }, */
    shop_block_dates: [
        {
            type: String
        }    
    ],
    shop_isActive: {
        type: Boolean,
        default: true
    },
    shop_is_recommended: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);
 
salonSchema.index({location:'2dsphere'});

const labs = mongoose.model("labs", salonSchema, "labs");


 module.exports = labs