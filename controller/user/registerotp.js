const User = require('../../modules/reegister')
const sendotpmail = require('../../utils/otpgenerator')
const {successResponse,errorResponse} = require('../../utils/response')
const messages = require('../../utils/constant')

const otpgenerate = async (req,res) =>{
    let userEmail = req.body.email.trim().toLowerCase()

    const payload ={
        user_email:userEmail
    }


   
    // try{
    //     let response = await sendotpmail(payload)
    //     return successResponse(200, messages.success.OTP_CREATED, response); 
    // }
    // catch(error){
    //     console.log(error)
    // }


    let user = await User.findOne({user_email:userEmail})
    let response;
    if (!user) {

        response = new User({
            user_email:userEmail
        })
        const newuser= await response.save();
        return successResponse(200, messages.success.OTP_CREATED, response); 
        // return successResponse(404, messages.success.NO_USER_FOUND, {});
    } else {
        response = await sendotpmail(user);
        return successResponse(200, messages.success.OTP_CREATED, response); 
    }
}
module.exports= otpgenerate 