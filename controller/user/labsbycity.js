const Labs = require('../../modules/admin/addlabs')
const {successResponse,errorResponse} = require('../../utils/response')
const messages = require('../../utils/constant');


const alllabs = async (req,res)=>{
    const city = req.query.city;

    const labds = await Labs.find({
        shop_city:city
    });

    return successResponse(200,messages.success.SUCCESS,labds);
}

module.exports = alllabs