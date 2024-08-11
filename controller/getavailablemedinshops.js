

const Availabile = require('./addvailability');

const Getmedinshop = async()=>{
    const availabilemed = await Availabile.find({shop:shopid,available:true})
    .populate('medicine')
    .populate('shop')

    console.log(availabilemed);
}

module.exports= Getmedinshop