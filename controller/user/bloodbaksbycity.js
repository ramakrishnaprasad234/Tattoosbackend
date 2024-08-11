
const Labs = require('../../modules/admin/addbloodbanks')
const {successResponse,errorResponse} = require('../../utils/response')
const messages = require('../../utils/constant');


const Bloodbank = async (req,res)=>{
    const city = req.query.city;

    const bloodbanks = await Labs.find({
        bloodbank_city:city
    });

    return successResponse(200,messages.success.SUCCESS,bloodbanks);
}

module.exports = Bloodbank