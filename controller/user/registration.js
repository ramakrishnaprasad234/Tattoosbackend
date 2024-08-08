
const usermodule = require('../../modules/reegister')
const messages = require("../../utils/constant")

 const register = async (req) =>{
    const user = await usermodule.findOne({
        user_email:req.body.email,
    });
  
        if(user){
    throw messages.error.ALREADY_USER;
}

else{ 
    const user = new usermodule({
        user_full_name: req.body.full_name.trim(),
        user_email: req.body.email.trim().toLowerCase(),
        user_mobile: req.body.mobile.trim().toLowerCase(), 
 });

    const newuser = await user.save();
     return newuser;
}
}
 

module.exports = register;