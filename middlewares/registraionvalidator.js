const messages = require("../utils/constant")
const {successResponse, errorResponse } = require("../utils/response")
const registrationJoiSchema = require("../utils/registartion.joi")

const validator = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return res.send(errorResponse(406, messages.error.MISSING_INPUTS, {}));
    }

    const payload = {
        full_name: req.body.full_name,
        email: req.body.email,
        mobile: req.body.mobile
    };
 
   
    const { error } = registrationJoiSchema.validate(payload);
    if (error) {
        return res.send(errorResponse(406, error.details[0].message, {})); // Sending a more detailed error message
    } else {
        console.log("payload")
       next()
    }   
};

module.exports = validator;
