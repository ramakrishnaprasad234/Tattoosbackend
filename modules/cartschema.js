

const mongoose = require('mongoose')

const cartschema = new mongoose.Schema({
    user_uuid:{
        type:String,
        required:true
    },
    shop_uuid:{
        type:String,
        required:true
    },
    items:[
        {
            medicine_uuid:{type:String,required:true},
            medicinename:{type:String,required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true},
            totalprice:{type:Number,required:true}
        }
    ],
    totalitems:{type:Number,required:true},
    totalprice:{type:Number,required:true}
});

const cart = mongoose.model('cart',cartschema);

module.exports = cart