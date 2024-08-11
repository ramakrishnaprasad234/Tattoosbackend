const availabilityschema = require('../modules/availability')

const addavailability =async(req,res) => {
    const {medicineuuid,shopuuid,isAvailable}=req.body
  try{
    const Availability = await availabilityschema.findOneAndUpdate(
        {medicine_uuid:medicineuuid,shop_uuid:shopuuid},
        {is_available:isAvailable},
        {upsert:true,new:true}
    );
    console.log("availability update",Availability);
    // console.log(response)
    res.status(200).json({ success: true, data: Availability });
  }
  catch(error){
        console.error(error);
        throw error;
  }
} 


module.exports = addavailability