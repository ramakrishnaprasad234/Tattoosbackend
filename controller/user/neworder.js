const orderscheam = require('../../modules/order');
const {v4: uuidv4} = require('uuid');

const neworder = async (req, res) => {
    try {
        // Map the items array and return transformed items

        const generateduuid=uuidv4()

        const items = req.body.items.map((medicine) => {
            return {
                medicine_uuid: medicine.medicine_uuid,
                medicinename: medicine.medicinename,
                quantity: medicine.quantity,
                price: medicine.price
            };
        });

        // Create a new order instance
        const order = new orderscheam({
            order_uuid:generateduuid,
            user_uuid: req.body.user_uuid,
            shop_uuid: req.body.shop_uuid,
            items: items
        });

        // Save the order to the database
        const response = await order.save();

        // Send success response
        return res.status(200).json({ message: 'Your order has been placed successfully' });

    } catch (error) {
        console.error("Error placing the order:", error);
        return res.status(500).json({ message: 'An error occurred while placing the order', error: error.message });
    }
};


const orderaccept =async(req,res)=>{
    try{
        const {orderid}= req.body;
        const order = await orderscheam.findByIdAndUpdate(
            orderid,
            {status:'Accepted'},
            {new:true}
        );
        if(!order){
            return res.json(404).json({success:false,message:'order not found'})
        }
        res.status(200).json({success:true,message:'order Accepted',order});
       }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message :'server error'})
    }
}

const rejectorder = async(req,res)=>{
    try{
        const {orderid}= req.body;
        const order = await orderscheam.findByIdAndUpdate(
            orderid,
            {status:'Rejected'},
            {new:true}
        );
        if(!order){
            return res.json(404).json({success:false, message :'order not found'})
        }
        res.status(200).json({success:true,message:'order rejected'});
    }
    catch(error){
        res.status(500).json({success:false, message:'server error'})
    }
}

module.exports = {neworder,orderaccept,rejectorder};
