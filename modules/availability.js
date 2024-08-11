

const mongoose = require('mongoose')


const availabilityschema = new mongoose.Schema({
    medicine_uuid:{
        type:String,
        ref:'medicines',
        required:true
    },
    shop_uuid:{
        type:String,
        ref:'shops',
        required:true
    },
    is_available:{
        type:Boolean,
        required:true
    }
})




const Availability = mongoose.model('Availability',availabilityschema,'Availability');
module.exports=Availability