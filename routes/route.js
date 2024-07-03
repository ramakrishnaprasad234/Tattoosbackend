
const route = require('express')
const router = route.Router();
const registraionvalidator = require('../middlewares/registraionvalidator.js')
const OtpGenerate = require('../controller/registerotp.js')
const {signup, bill} = require('../controller/appcontroller.js')
const registerUser = require('../controller/registration.js')
const { successResponse, errorResponse } = require("../utils/response.js");
const{register} = require('../controller/auth.js');
const  messages  = require('../utils/constant.js');
const registerotp = require('../middlewares/registerotp.js');
const { required } = require('../utils/registartion.joi.js');
 const  otpverify = require('../middlewares/verifyotp.js')
 const verifyotp = require('../controller/verifyotp.js')
 // router.post('/user/signup',signup)

 // router.post('/user/bill',bill)


   router.post('/register',registraionvalidator, async (req,res)=>{
        try{
            const newUser = await registerUser(req);
            res.send(successResponse(201, messages.success.USER_CREATED, newUser))
        }
        catch(error){
            res.send(errorResponse(409, error.message))
        }
})   



      router.post('/registerotp',registerotp,async(req,res)=>{
        let response;
        try {
          response = await OtpGenerate(req, res);
          res.status(response.code).json(response);
        } catch (error) {
         {/* res.send(errorResponse(500, messages.error.WRONG));*/}
         console.log(error) 
        }

        }
      )  

    router.post('/verifyotp',otpverify,async (req,res)=>{
      let response;
      try{
        response = await verifyotp(req,res);
         res.status(response.code).json(response);
         console.log("executed")
      }

      catch (error) {
        console.log(error)
      }
    })


    

   /*  router.post('/generateotp',otpvalidator,async(req,res)=>{
        
     }) */

module.exports = router