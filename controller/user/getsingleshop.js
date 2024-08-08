const {successResponse,errorResponse} = require('../../utils/response')
const ShopModel = require('../../modules/admin/addshop')
const messages = require('../../utils/constant')
const getsingleshop = async (req,res)=>{
const shop_uuid = req.body.shop_uuid

console.log(shop_uuid)

const shopuuid= await ShopModel.find({
    shop_uuid:shop_uuid
});


console.log(shopuuid)

return successResponse(200,messages.successResponse,shopuuid)

}


module.exports = getsingleshop 