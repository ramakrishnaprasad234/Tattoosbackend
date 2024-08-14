

const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const testscheman = mongoose.Schema({
    test_uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    lab_uuid:{
        type:String,
        required:true
    },
    testname:{
        type:String,
        required:true
    },
    testcode:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    sampletype:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },

}
, { timestamps: true }

)

module.exports = mongoose.model("test", testscheman, "test");