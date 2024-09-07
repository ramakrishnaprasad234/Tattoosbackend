const mongoose = require('mongoose')
const Availabilitymodel = require('./../modules/availability')



const Availability = async (req,res)=>{
    const {shopuuid}= req.body
    try{
        const results = await Availabilitymodel.aggregate([
            {
                $match:{
                    shop_uuid:shopuuid,
                    is_available:true
                }
            },
            {
                $lookup:{
                    from:'medicines',
                    localField:'medicine_uuid',
                    foreignField:'medicine_uuid',
                    as:'medicine_details'
                }
            },
            {
                $unwind:'$medicine_details'
            },{
                $project:{
                    _id:0,
                    medicine_uuid:1,
                    is_available: 1,
                    quantity: 1,
                    medicine_details: {
                        medicie_name: 1,
                        medicine_discription: 1,
                        imgurl:1,
                        medicine_manufacture: 1,
                        medicine_category: 1,
                        medicine_strenght: 1,
                        medicie_expirationdate: 1
                    }
                }
            }
        ])
        console.log('medicine available in shop',results);
        res.status(200).json({ success: true, data: results });
        
    }

    catch(err){
        console.error(err)
        throw err
    }
}

module.exports = Availability