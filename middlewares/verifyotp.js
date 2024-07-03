const validator=require('../utils/verifyotp')
const { successResponse, errorResponse }=require('../utils/response')
const verifyotp = async (req,res,next)=>{
    const paload={
        email:req.body.email,
        otp:req.body.otp
    }
   
    const {error} = validator.validate(paload);
	if (error) {
		return res.send(errorResponse(406, error.details[0].message, {}));
	} else {
		next();
	}

}

module.exports = verifyotp