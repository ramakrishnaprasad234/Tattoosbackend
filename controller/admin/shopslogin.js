
const shops = require('../../modules/admin/addshop')
const Orders = require('../../modules/order')
const shopslogin = async (req,res)=>{
    const{shopusername,password}=req.body

    const user = await shops.findOne({
        
        shop_username:shopusername,
        shop_password:password
    })

    if(user){
        res.status(200).json({
            message:'login successfull',
            data:user
        })
    }
    else{
        res.status(404).json({
            message:'username or password wrong'
        })
    }

}


const shopgetorders=async(req,res)=>{
    const {shop_uuid}= req.params

    const shoporders = await Orders.find({
        shop_uuid:shop_uuid
    })

    if(shoporders){
        res.status(200).json({
           message:'success',
           data:shoporders
        })
    }

    else{
        res.status(404).json({
            message:'you dont have any orders'
        })
    }

}


module.exports = {shopslogin,shopgetorders}