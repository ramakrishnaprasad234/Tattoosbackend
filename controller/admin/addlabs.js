const   {v4:uuidv4}  = require('uuid')
const addlabs = require('../../modules/admin/addlabs')
const { successResponse, errorResponse } = require('../../utils/response')
const messages = require('../../utils/constant')
const addlab = async(req,res)=>{

    const location = { type: "Point", coordinates: [Number(req.body.location.split(",")[0]), Number(req.body.location.split(",")[1])] };
    const salon = new addlabs({
        shop_uuid: uuidv4(),
        shop_username: req.body.username,
        shop_password: req.body.password,
        shop_code: req.body.code,
        shop_name: req.body.name,
        shop_email: req.body.email,
        shop_description: req.body.description,
        shop_type: req.body.type,
        shop_address: req.body.address,
        shop_area: req.body.area,
        shop_city: req.body.city,
        shop_state: req.body.state,
        location: location,
      //  salon_slots: req.body.slots_number,
      //  salon_services: services,
      //  salon_combo_services: combo_services,
       // salon_opening_time: req.body.opening_time,
     //   salon_closing_time: req.body.closing_time,
      //  salon_lunch_start_time: req.body.lunch_start_time,
      //  salon_lunch_end_time: req.body.lunch_end_time,
      //  salon_photos: photosPath,
     //   salon_features: features,
     //   salon_languages: languages,
        shop_owner_name: req.body.owner_name,
        shop_owner_mobile: req.body.owner_mobile,
     //   salon_owner_pancard_number: req.body.owner_pancard_number,
     //   salon_bank_name: req.body.bank_name,
     //   salon_bank_account_number: req.body.bank_account_number,
     //   salon_bank_IFSC_code: req.body.bank_IFSC_code,
      });
      const response = await salon.save();
      return successResponse(201, messages.success.LAB_ADDED, { response });

}

module.exports = addlab