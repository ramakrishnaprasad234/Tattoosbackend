
const mongoose = require('mongoose')

const userAdressSchema = new mongoose.Schema({
    user_uuid:{
        type:String,
        required:true,
        ref:'user'
    },
    address:{
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true,
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    coordinates:{
        type:{
            type:String,
            default:'Point',
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userAdressSchema.index({coordinates:'2dsphere'})

const UserLocation = mongoose.model('useradress', userAdressSchema)

module.exports = UserLocation