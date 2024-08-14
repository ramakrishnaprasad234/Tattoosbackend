const {v4:uuidv4} = require('uuid')
const medicines = require('../../modules/admin/addmedicine')
const { successResponse, errorResponse } = require('../../utils/response')
const messages = require('../../utils/constant')

const addmedicine = async(req,res)=>{

  
    const medicine = new medicines({
      medicine_uuid:uuidv4(),
      medicie_name:req.body.medicinename,
      medicine_discription:req.body.medicinediscription,
      medicine_price:req.body.medicineprice,
      medicine_manufacture:req.body.manufacture,
      medicine_category:req.body.category, 
      medicine_strenght:req.body.stregth,
      medicie_expirationdate:req.body.expirationdate,
      isavailable:req.body.available,
    })

    


    const response = await medicine.save();
    return successResponse(201, messages.success.SALON_ADDED, { response });
}

module.exports = addmedicine