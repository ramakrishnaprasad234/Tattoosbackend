
const addlabtest= require('../../modules/labtest')
const addlabservuces = async (req,res)=>{
    const {lab_uuid,testname,testcode,discription,sampletype,duration,price} = req.body

    const labtest= new addlabtest({
        lab_uuid:lab_uuid,
        testname:testname,
        testcode:testcode,
        discription:discription,
        sampletype:sampletype,
        duration:duration,
        price:price
    }
)

const response = await labtest.save()
res.status(200).json({
    message:'you have succefully added',
    data:response
})
}

module.exports = addlabservuces