const labs = require('../../modules/admin/addlabs')

const singlelab = async (req,res)=>{
    const lab = req.query.shop_uuid

    const getsinglelab = labs.findOne({
        shop_uuid:lab
    })

    return res.status(200).json({data:getsinglelab})

}

module.exports =singlelab