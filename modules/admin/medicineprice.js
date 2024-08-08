const mongoose = require("mongoose")
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');


const medicineshopSchema = new schema({ 
    shop_uuid:{
       type:String,
       required:true,
       unique:true,
       default:uuidv4()
    },
    medicine_uuid:{
       type:String,
       required:true,
    },
    medicine_price:{
       type:String,
       required:true,
    },
    medicine_availability:{
        type:String,
       required:true,
    },
    medicine_stock:{
        type:String,
        required:true,
    }
   
   }
)

const medicineprice = mongoose.model("medicineprice", medicineshopSchema, "medicineprice");

module.exports = medicineprice