
const otpgenerator = require('otp-generator')
const Otpmodel = require('../modules/otpmodule');
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config();
const {Email,PASSWORD} = require('../routes/env.js')
const {v4: uuidv4} = require('uuid'); 


const otpgeneratorr = async (user) =>{
  
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'tejvarun7396@gmail.com',
        pass:'qmel yzuz jvnc ndto'
    }
  })
    
   
    let otp = otpgenerator.generate(6,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    
     
      let existingOtp = await Otpmodel.findOne({ otp_user_uuid: user.user_uuid })
      if (existingOtp) {
          if (existingOtp.otp_timeOutTime) {
              if (existingOtp.otp_timeOutTime > Date.now()) {
                  // logic for showing him timeout
                  let waitingTime = (existingOtp.otp_timeOutTime - Date.now()) / (1000 * 60)
                  return `Please wait for ${waitingTime} minutes`
              } else {
                  // updating existing otp when timeout is now cool down
                  existingOtp.otp_number = otp
                  existingOtp.otp_expireAt = Date.now() + 180000
                  existingOtp.otp_count = 0
                  existingOtp.otp_timeOutTime = null
                  await existingOtp.save()
              }
          } else {
              // updating existing otp when no timeout is there
              existingOtp.otp_number = otp
              existingOtp.otp_expireAt = Date.now() + 180000
              existingOtp.otp_count = 0
              await existingOtp.save()
          }
      } else {
        const generateduuid=uuidv4() 
          // creating new otp
          const newOtp = new Otpmodel({  otp_uuid:generateduuid, otp_number: otp, otp_user_uuid: user.user_uuid, otp_expireAt: Date.now() + 180000, otp_count: 0 });
          await newOtp.save();
      }
        
      let Mailgenerator = new Mailgen({
        theme:"default",
        product:{
          name:"Mailgen",
          link:'https://mailgen.js/'
        }
      })
      let response = {
        body:{ 
          name:"Gopi",
       intro:"Your bill has succes",
       table:{
         data:[
          {
           item:"gyu",
           discripton:{otp}
          }
         ]
       }
     }}
 
      let mail = Mailgenerator.generate(response)

      let message = {
        from:Email,
        to:user.user_email,
        subject:"jubhs",
        html:`${otp}`
      }

      let result = await transporter.sendMail(message);
      return {}
    /*transporter.sendMail(message).then(() =>{
      return res.status(201).json({
        msg:"you should recive an email"
      })
    }).catch(Error =>{
      return res.status(500).json({Error})
    }) */
}

module.exports = otpgeneratorr