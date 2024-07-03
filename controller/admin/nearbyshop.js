
const shop = require("../../modules/admin/addshop")

const nearbyshop = async (req,res)=>{
    const {lat,long} = req.body
   console.log(req.body.latitute)
   console.log(req.body.longitute)
   
   const userlocation ={
    type:'point',
    coordinates: [parseFloat(long), parseFloat(lat)]
   }



    try{
   const nearbyshops =  await shop.find({
    location:{ 
        $near:{
            $geometry:userlocation,
            $maxDistance: 5000 
        }
    }
   })
   res.json(nearbyshops)
   console.log(nearbyshop)
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });

    }
}

module.exports = nearbyshop