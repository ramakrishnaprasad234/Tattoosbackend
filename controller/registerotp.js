const User = require('../modules/reegister')
const sendotpmail = require('../utils/otpgenerator')
const {successResponse,errorResponse} = require('../utils/response')
const messages = require('../utils/constant')
const otpgenerate = async (req,res) =>{
    let userEmail = req.body.email.trim().toLowerCase()
    let user = await User.findOne({user_email:userEmail})
    let response;
    if (!user) {
        return successResponse(404, messages.success.NO_USER_FOUND, {});
    } else {
        response = await sendotpmail(user);
        return successResponse(200, messages.success.OTP_CREATED, response); 
    }
}
module.exports= otpgenerate 