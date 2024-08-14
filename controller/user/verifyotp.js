const usermodule = require('../../modules/reegister');
const OtpModel = require('../../modules/otpmodule');
const { successResponse, errorResponse } = require('../../utils/response');
const messages = require('../../utils/constant');
const jwt = require('jsonwebtoken');

const verifyotp = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;

        const user = await usermodule.findOne({ user_email: email });

        if (!user) {
            console.log('User not found');
            return res.json(errorResponse(404, messages.error.USER_NOT_FOUND, {}));
        }

        const otpData = await OtpModel.findOne({ otp_user_uuid: user.user_uuid });

        if (!otpData) {
            console.log('No OTP found');
            return res.json(errorResponse(406, messages.error.NO_OTP, {}));
        }

        if (otpData.otp_expireAt < Date.now()) {
            console.log('OTP expired');
            return res.json(successResponse(205, messages.success.OTP_EXPIRED, {}));
        } else {
            if (otpData.otp_count < 3) {
                if (otp == otpData.otp_number) {
                    user.user_verified = true;
                    await user.save();
                    await OtpModel.findOneAndDelete({ otp_uuid: otpData.otp_uuid });

                    const payload = {
                        id: user._id,
                        email: user.user_email,
                    };

                    const token = jwt.sign(payload, "njdiadkmjolsaxLKmoicas", { expiresIn: '60d' });

                    const cookies = {
                        http: true,
                        secure: true,
                    };

                    console.log('Token generated, sending response');
                    res.cookie('token', token, cookies);
                    return {code: 200, message: messages.success.USER_VERIFIED, data: {user:user,token:token}}
                    

                } else {
                    otpData.otp_count += 1;
                    if (otpData.otp_count === 3) {
                        otpData.otp_timeOutTime = Date.now() + 120000;
                    }
                    await otpData.save();
                    console.log('Invalid OTP');
                    return res.json(errorResponse(400, messages.success.INVALID_OTP, {}));
                }

            } else {
                console.log('OTP limit reached');
                return res.json(errorResponse(400, messages.success.OTP_LIMIT, {}));
            }
        }
    } catch (err) {
        console.error('Error in verifyotp:', err); // This will help identify where the issue is
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = verifyotp;
