
const getuser = require('../../utils/getuser')
const getuserdetails = async (req,res)=>{
    try{
        const token = req.cookies.token || ""
        const user = await getuser(token)
        return res.status(200).json({
            message:"userdetails",
            data:user
        })

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            error:err
        })
    }

}

module.exports = getuserdetails