
const medicine = require('../../modules/admin/addmedicine')
const availability = require('../../modules/availability')


const medicinesearch = async(req,res)=>{

    const {query,shopid}=req.query;

    if(!query || query.length < 3 || !shopid){
        return res.json([]);
    }


    try{
        const availablemedicine = await availability.find({shop_uuid:shopid}).select('medicine_uuid');

        const medicineids = availablemedicine.map((availability)=> availability.medicine_uuid);

        const results = await medicine.find({
            medicine_uuid:{$in: medicineids},
            medicie_name:{$regex:query,$options:'i'},
        }).limit(10)

        res.json(results);
    }

    catch(error){
        console.log(error)
        res.status(500).json({message:'error'});
    }
}


module.exports = medicinesearch