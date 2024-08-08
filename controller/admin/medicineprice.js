
const { successResponse, errorResponse } = require('../../utils/response');
const messages = require('../../utils/constant');
const MedicineShopPrice = require('../../modules/admin/medicineprice');
const ShopModule = require('../../modules/admin/addshop');
const addmedicine = require('../../modules/admin/addmedicine')
const addmedicineprice = async (req, res) => {
    try {
        const shopid = req.body.shop_uuid;

        // Verify if shop exists
        const shop = await ShopModule.findOne({ shop_uuid: shopid });
        if (!shop) {
            return "shop is not there";
        }

        const medicineid = req.body.medicine_uuid;

        const medicine=await addmedicine.findOne({medicine_uuid:medicineid});
        if(!medicine){
            return "medicne_uuid is not there"
        }

        // Create a new MedicineShopPrice document
        const medicineprice = new MedicineShopPrice({
            shop_uuid: shopid,
            medicine_uuid: req.body.medicine_uuid,
            medicine_price: req.body.price,
            medicine_availability: req.body.availability,
            medicine_quantity: req.body.quantity,
            medicine_stock: req.body.stock
        });

        // Save the document to the database
        const response = await medicineprice.save();

        // Return success response
       // return successResponse(res, 201, messages.success.MEDICINEPRICE_ADDED, { response });
        return response
    } catch (error) {
        console.log(error)
       // return errorResponse(res, 500, messages.error.INTERNAL_SERVER_ERROR);
    }
};

module.exports = addmedicineprice;
