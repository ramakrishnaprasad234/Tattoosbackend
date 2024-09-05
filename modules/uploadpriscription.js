const mongoose = require('mongoose')

const schema = mongoose.Schema;

const priscription = new schema({
    user_uuid:{
        type:String,
        required:true,
    },
    s3url:{
        type:String,
        required:true
    },
    uploadedat:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('priscription',priscription,'priscriptions');