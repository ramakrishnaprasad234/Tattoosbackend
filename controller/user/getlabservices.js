
const tests = require('../../modules/labtest')
const getlabservices = async (req,res)=>{
    const lab = req.query.shop_uuid

    try{

        const test =await tests.findOne({
            lab_uuid:lab
        })
        if(!test){
          
            res.status(400).json({message:'No test found'})
        }
        else{
            res.status(200).json({messgae:'success',date:test})
        }
       
    }
    catch(err){
        res.status(500).json({err:err})
    }
   
        
}


module.exports = getlabservices
