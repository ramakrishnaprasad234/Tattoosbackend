

const jwt = require('jsonwebtoken')

const user = require('./../modules/reegister')

const verifyuserdetails = async(token)=>{
    if(!token){
            return{
                message:"session time out"
            }
    }
    const decode = await jwt.verify(token,"njdiadkmjolsaxLKmoicas")

    const finduser = await user.findById(decode.id)

    return finduser
}

module.exports = verifyuserdetails