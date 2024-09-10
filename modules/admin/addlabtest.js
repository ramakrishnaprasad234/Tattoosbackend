
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const {v4:uuidv4} = require('uuid')

const testschema = new Schema({
    test_uuid:{
        type:String,
        required:true,
        unique:true,
        
    },
    lab_uuid:{
        type:String,
        required:true
    },
    test_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,    
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    sample_type:{
        type:String,
        enum:['Boold Test', 'Urine Test', 'Imaging', 'Others'],
        required:true
    },
    type:{
        type:String,
        enum:['Test','Profile'],
        required:true
    },
    included_tests:[
        {
            type:String,
            required: function(){
                return this.type === 'Profile';
            },
        },
    ],
});

module.exports = mongoose.model('Test',testschema);