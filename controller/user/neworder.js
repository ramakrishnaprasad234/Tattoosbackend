const orderscheam = require('../../modules/order')

const neworder = async(req,res)=>{
    
    const items = req.body.items.map((medicine)=>{
        const item ={
                medicine_uuid:medicine.medicine_uuid,
                medicinename:medicine.medicinename,
                quantity:medicine.quantity,
                price:medicine.price
        }
    })
    
    const order = new orderscheam({
        user_uuid:req.body.user_uuid,
        shop_uuid:req.body.shop_uuid,
        items:items
    })

    const response = await order.save()

    return res.status(200).json({message:'your order has placed successfully'})


}

module.exports = neworder