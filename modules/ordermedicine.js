
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const {v4:uuidv4} = require('uuid')


const orderschema = new schema({

    order_uuid:{
        type:String,
        required:true,
        unique:true,
        default:uuidv4()
    },
    user_uuid:{
        type:String,
        required:true
    },
    shop_uuid:{
        type:String,
        required:true
    },
    medicine_uuid:{
        type:String,
        required:true,
    },
    addres:{
        type:String,
        required:true
    },


}) 

module.exports = orderschema