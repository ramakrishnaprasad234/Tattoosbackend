const { date } = require('joi');
const bloodbankchema = require('../../modules/admin/addbloodbanks')
const   {v4:uuidv4}  = require('uuid')
const Bloodbanks = async(req,res)=>{
    const location = { type: "Point", coordinates: [Number(req.body.location.split(",")[0]), Number(req.body.location.split(",")[1])] };

    const bloodbank = new bloodbankchema({
        bloodbank_uuid: uuidv4(),
        bloodbank_username: req.body.username,
        bloodbank_password: req.body.password,
        bloodbank_code: req.body.code,
        bloodbank_name: req.body.name,
        bloodbank_email: req.body.email,
        bloodbank_address: req.body.address,
        bloodbank_area: req.body.area,
        bloodbank_city: req.body.city,
        bloodbank_state: req.body.state,
        location: location,
        shop_owner_name: req.body.owner_name,
        shop_owner_mobile: req.body.owner_mobile,
    })
    const response = await bloodbank.save();
    return res.status(200).json({
        message:"Blood bank added successfully",
        data:response
    })
}

module.exports = Bloodbanks