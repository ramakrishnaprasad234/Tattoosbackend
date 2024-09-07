

const mongoose = require("mongoose")
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const medicineSchema = new schema({ 
 medicine_uuid:{
    type:String,
    required:true,
    unique:true,
    default:uuidv4()
 },
 medicie_name:{
    type:String,
    required:true,
 },
 imgurl:{
   type:String,
   required:true
 },
 medicine_discription:{
    type:String,
    required:true,
 },
 medicine_price:{
   type:Number,
   required:true,
 },
 medicine_manufacture:{
    type:String,
    required:true,
 },
 medicine_category:{
    type:String,
    required:true,
 },
 medicine_strenght:{
    type:String,
    required:true,
 },
 medicie_expirationdate:{
    type:String,
    required:true,
 },
 isavailable:{
    type:Boolean,
    required:true
 }

})

medicineSchema.index({medicie_name:'text'})


   
const addmedicine = mongoose.model("medicines", medicineSchema, "medicines");


 module.exports = addmedicine