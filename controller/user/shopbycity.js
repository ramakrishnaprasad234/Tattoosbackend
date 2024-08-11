
const {successResponse,errorResponse} = require('../../utils/response')
const ShopModel = require('../../modules/admin/addshop')
const messages = require('../../utils/constant')

const shopbycity = async (req,res) =>{


    const city = req.query.city;
    console.log(city)
    const shops = await ShopModel.find({
        shop_city:city
    });
    console.log(shops)
    return successResponse(200,messages.success.SUCCESS,shops);

    /*
 const city = req.query.city;
 const userCoordinates = req.query.location;
 const minServicePrice = req.query.minServicePrice;
 const maxServicePrice = req.query.maxServicePrice;
 const minComboPrice = req.query.minComboPrice;
 const maxComboPrice = req.query.maxComboPrice;
 const sex = req.query.sex;
 const minRating = parseFloat(req.query.minRating);
 const area = req.query.area;
 const serviceString = req.query.service;
 const distance = parseFloat(req.query.distance);


 if (!city) return errorResponse(400, messages.error.CITY_NAME_REQ, {});

 const aggregationStages = [{
    $match:{
        shop_city:city,
    },
 },

{
    $project: {
        _id: 0,
        __v: 0,
        shop_username: 0,
        shop_password: 0,
        createdAt: 0,
        updatedAt: 0,
}, },
];

if(area){
    aggregationStages.push({
        $match: {
          shop_area: area,
        },
      })
}

let salons = await ShopModel.aggregate(aggregationStages);
*/


}


module.exports = shopbycity