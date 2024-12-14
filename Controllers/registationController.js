const registrtion = require('../models/registrationmodel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const otpschema = require('../models/otp')
const nodemailer = require('nodemailer');
const Profile = require('../models/Profile')




// Register controller
const registrations = async (req, res) => {
    const { username , email, phonenumber , password , confirmPassword } =  req.body
  //   console.log(username,email,phonenumber,password,confirmPassword)
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if user already exists
      const existingUser = await registrtion.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'username or email already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new registrtion({
          username,
          email,
        phonenumber,
        password: hashedPassword,
        confirmPassword: hashedPassword
      });
    
      // Save the user to the database
      await user.save();
  
      // if(newUser){
      //     const profile = new profile.schema
      
    
      // }
  
   // Create a Profile for the user
   const profile = new Profile({
    userId: user._id,
    name: user.username,
    email: user.email,
    mobile: user.phonenumber
  });
  
  await profile.save();
  
      res.status(201).json({ message: 'User registered successfully',user, profile });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };
  
  //  login controller
  const registrtionLogin = async(req, res) => {
      const { email, password } = req.body;
      // console.log( email, password )
      try {
          const registrtions = await registrtion.findOne({ email });
          if (!registrtions || !(await bcrypt.compare(password, registrtions.password))) {
              return res.status(401).json({ error: "Invalid username or password" })
          }
          const token = jwt.sign({ vendorId: registrtions._id }, "jwytfaatererhd", { expiresIn: "90days" })
  
          const vendorId = registrtions._id;
          const cookies ={
            http:true,
            secure:true
          }
  
          return res.cookie('token',token,cookies).status(200).json({ success: "Login successful",user:registrtions, token, vendorId })
          // console.log(email, "this is token", token);
      } catch (error) {
          // console.log(error);
          res.status(500).json({ error: "Internal server error" });
      }
  
  }





// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tejvarun7396@gmail.com',
        pass: 'qmel yzuz jvnc ndto',
    },
});

// Send OTP via Email
async function sendEmail(email, otp) {
    await transporter.sendMail({
        from: 'tejvarun7396@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });
}

// Request OTP
const requestOTP = async (req, res) => {
    const { email } = req.body;
    // console.log(email)
    if (!email) return res.status(400).send({ message: 'Email is required.' });

    try {
        const user = await registrtion.findOne({ email });
        if (!user) return res.status(404).send({ message: 'User not found.' });

        const otp = generateOTP();

        console.log(otp)
        
        const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        // await user.save();

        await sendEmail(email, otp); // Send OTP via email
        res.status(200).send({ message: 'OTP sent successfully to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to send OTP.' });
    }
};


// Verify OTP and Reset Password
const resetPassword = async (req, res) => {
    const { email } = req.body;
    // console.log(email, otp, newPassword)
    // if (!email || !otp || !newPassword)
    //     return res.status(400).send({ message: 'Email, OTP, and new password are required.' });

    try {
        const user = await registrtion.findOne({ email });
       
        if(!user){
            return res.status(400).json({"message":"register first"})
        }

        const existingOtp = await otpschema.findOne({otp_user_uuid:user._id})

        console.log(existingOtp)
        const generatedotp = generateOTP();

        if(existingOtp){
            if (existingOtp.otp_timeOutTime) {
                if (existingOtp.otp_timeOutTime > Date.now()) {
                    // logic for showing him timeout
                    let waitingTime = (existingOtp.otp_timeOutTime - Date.now()) / (1000 * 60)
                    return `Please wait for ${waitingTime} minutes`
                } else {
                    // updating existing otp when timeout is now cool down
                    existingOtp.otp_number = generatedotp
                    existingOtp.otp_expireAt = Date.now() + 180000
                    // existingOtp.otp_count = 0
                    existingOtp.otp_timeOutTime = null
                    await sendEmail(email, generatedotp);
                    await existingOtp.save()
                }
            }
            else {
                // updating existing otp when no timeout is there
                existingOtp.otp_number = generatedotp
                existingOtp.otp_expireAt = Date.now() + 180000
                existingOtp.otp_count = 0
                await sendEmail(email, generatedotp);
                await existingOtp.save()
            }
        }
        else{
            const newotp = new otpschema({otp_number:generatedotp,otp_user_uuid:user._id,otp_expireAt: Date.now() + 180000})
            await sendEmail(email, generatedotp);
            await newotp.save()
        }
        

        // if (!user || generatedotp !== otp || Date.now() > user.otpExpiresAt) {
        //     return res.status(400).send({ message: 'Invalid or expired OTP.' });
        // }

        // Hash new password and save (use bcrypt for hashing)
        // user.password = newPassword; // Replace with hashed password in production
        // user.otp = undefined;
        // user.otpExpiresAt = undefined;
        // await user.save();
        
        res.status(200).send({ message: 'Otp sent  successfully.',user});

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to sent Otp.' });
    }
};

    // const verifyotp = async (req,res) =>{
    //     const {id,otp,newpasswords} = req.body

    //     const userverify = await otpschema.findOne({otp_user_uuid:id})
    //     console.log(userverify)
    //     if(userverify && userverify.otp_number !== otp){
    //         return res.status(400).json({"message":"invalid otp"})
    //     }
    //     else if(userverify.otp_number === otp){
    //         const user = await registrtion.findOne({_id:id})
    //         console.log('passowrd',user)
    //         const hashedPassword = await bcrypt.hash(newpasswords, 10);
    //         user.password = hashedPassword
    //         user.confirmPassword = hashedPassword
    //         await user.save()
    //         return res.status(200).json({'message':'otp verify'})
    //     }

    // }

    const verifyOtpOnly = async (req, res) => {
        try {
          const { id, otp } = req.body;
          console.log(id, otp)
      
          const userverify = await otpschema.findOne({ otp_user_uuid: id });
          console.log(userverify)
      
          if (!userverify || userverify.otp_number !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
          }
      
          return res.status(200).json({ message: 'OTP verified successfully',data:userverify });
        } catch (error) {
          console.error('Error verifying OTP:', error);
          return res.status(500).json({ message: 'Server error' });
        }
      };

      const updatePassword = async (req, res) => {
        try {
          const { id, newpasswords } = req.body;
      
          const user = await registrtion.findOne({ _id: id });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const hashedPassword = await bcrypt.hash(newpasswords, 10);
          user.password = hashedPassword;
          user.confirmPassword = hashedPassword;
      
          await user.save();
      
          return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ message: 'Server error' });
        }
      };


  
    

module.exports = {registrations,registrtionLogin,requestOTP,resetPassword,verifyOtpOnly,updatePassword}