const validator= require('../utils/registerotp')
const {successResponse, errorResponse } = require("../utils/response")
const registerotp = async (req,res,next)=>{
    const payload = {
        email:req.body.email
    };

    const {error} = validator.validate(payload)
    if(error){
        return res.send(errorResponse(406, error.details[0].message, {})); // Sending a more detailed error messag
    }
    else{
        console.log("payload")
        next()
    }
}

module.exports = registerotp