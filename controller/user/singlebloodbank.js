const bloodbank = require('../../modules/admin/addbloodbanks')

const Singlebloodbank =async (req,res)=>{
    const blood = req.query.bloobank_uuid
    console.log('coming')
    const Bloodbank = await bloodbank.findOne({
        bloodbank_uuid:blood
    })

    res.status(200).json({message:Bloodbank})

}

module.exports=Singlebloodbank