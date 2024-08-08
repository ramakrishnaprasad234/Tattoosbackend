const shop = require('../../modules/admin/addshop')

const getallshops = async (req,res)=>{

    try{

        const allshops = await shop.find()
         return res.status(200).json({
            message:allshops
         })

    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }

}

module.exports = getallshops