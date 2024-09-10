const Test = require('../../modules/admin/addlabtest')

const gettest = async(req,res)=>{
    try{
    const {lab_uuid}=req.params

    const alltest = await Test.find({lab_uuid:lab_uuid,type:'Test'})

    return res.status(200).json({
        message:'successfull',
        alltest:alltest
    })
}
catch(error){
    return res.status(500).json({
        error:'server error'
    })
}
}


const getprofile = async(req,res)=>{
    try{
        const {lab_uuid}= req.params
        const getprofiletest=await Test.find({lab_uuid:lab_uuid,type:'Profile'})
        return res.status(200).json({
            message:'successfull',
            profiles:getprofiletest
        })
    }
    catch(error){
        return res.status(500).json({
            message:'server error',
            error:error
        })
    }
}


module.exports = {gettest,getprofile}