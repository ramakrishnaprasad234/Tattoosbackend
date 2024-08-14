const labs = require('../../modules/admin/addlabs')

const singlelab = async (req,res)=>{
    const lab = req.query.shop_uuid
    try{
        const getsinglelab = await labs.findOne({
            shop_uuid:lab
        })
        if(getsinglelab){
            return res.status(200).json({data:getsinglelab})
        }
    
        else{
            res.status(400).json({message:'No Labs found'})
        }
    }

    catch(err){
        res.status(500).json({
            message:err
        })
    }

   
   

}

module.exports =singlelab