
const medicine = require('../../modules/admin/addmedicine')

const singlemedicine = async (req,res)=>{

    try{
        const medicinename = req.query.name
        const searchmedicine = await medicine.findOne({
            medicie_name:{$regex: medicinename, $options: "i"}
        })
        return res.status(200).json({
            message:searchmedicine
        })
    }
    catch(error){
        res.status(500).json({
            message:error
        })
    }
}

module.exports = singlemedicine