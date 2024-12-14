const express = require('express')
const {registrations,registrtionLogin,requestOTP,resetPassword,verifyOtpOnly,updatePassword} = require('../Controllers/registationController')

const router = express.Router()

router.post("/Register",registrations)
router.post("/login",registrtionLogin)
// router.post('/request-otp', requestOTP);
router.post('/reset-password', resetPassword);
router.post('/verify-otp',verifyOtpOnly)
router.post('/update-password', updatePassword);


module.exports = router