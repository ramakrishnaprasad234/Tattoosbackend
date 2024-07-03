const usermodule= require('../modules/reegister')
const OtpModel = require('../modules/otpmodule')
const{successResponse,errorResponse}= require('../utils/response')
const messages = require('../utils/constant')
const verifyotp = async(req,res)=>{
   const email =req.body.email
   const otp = req.body.otp

   const user = await usermodule.findOne({user_email:email})

    if(!user) return errorResponse(404, messages.error.USER_NOT_FOUND, {})

        const otpData = await OtpModel.findOne({otp_user_uuid: user.user_uuid})

        if(!otpData) return errorResponse(406, messages.error.NO_OTP, {})

            if (otpData.otp_expireAt < Date.now()) {
                return successResponse(205, messages.success.OTP_EXPIRED, {})
            }
            else { 
                // if not expired then check whether the otp is same or not 
                if (otpData.otp_count < 3) {
                    if (otp == otpData.otp_number) { 
                        // if true then change verified to true
                        user.user_verified = true
                        await user.save()
                        await OtpModel.findOneAndDelete({otp_uuid: otpData.otp_uuid});
                        return {code: 200, message: messages.success.USER_VERIFIED, data: {}}
                    }
                    else {
                        if (otpData.otp_count == 2) {
                            otpData.otp_count += 1
                            otpData.otp_timeOutTime = Date.now() + 120000
                            await otpData.save()
                        } else {
                            otpData.otp_count += 1
                            await otpData.save()
                        }
                        return errorResponse(400, messages.success.INVALID_OTP, {})
                    }
        
                }
                else {
                    return errorResponse(400, messages.success.OTP_LIMIT, {})
                }}

}

module.exports = verifyotp