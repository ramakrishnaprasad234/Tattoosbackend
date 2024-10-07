const medicalshop = require('../../modules/admin/addshop')
const lab = require('../../modules/admin/addlabs')
const medicine = require('../../modules/admin/addmedicine')


const allsearchengine = async(req,res)=>{
    const query = req.query.q;
    
    try{
        const medicalshops = await medicalshop.find({shop_name:{$regex:query, $options:'i'}});
        const labs = await lab.find({shop_name:{$regex:query,$options:'i'}});
        const medicines = await medicine.find({medicie_name:{$regex:query,$options:'i'}});

        res.json({
            medicalshops,labs,medicines
        })
    }
    catch(error){
        res.status(500).json({
            message:'server error',
            error:error
        })
    }
}
module.exports = allsearchengine