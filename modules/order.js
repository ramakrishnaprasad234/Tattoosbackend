

const mongoose = require('mongoose')


const { v4: uuidv4 } = require('uuid');

const order = new mongoose.Schema({
    order_uuid:{
        type:String,
        required:true,
        unique:true,
        
    },
    status:{type:String, default:'pending'},
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
            price:{type:Number,required:true}
        }
    ]

},
{ timestamps: true }

)

const Order = mongoose.model('orders',order)

module.exports = Order