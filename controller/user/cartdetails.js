const cartschema = require('../../modules/cartschema')
const medicineschema= require('../../modules/admin/addmedicine')


const cartcontroller = async(req,res)=>{
 const{user_uuid,medicine_uuid,quantity}= req.body
 let usercart = await cartschema.findOne({
    user_uuid:user_uuid
 })

    
     if (!usercart) {
      usercart = new cartschema({ user_uuid, items: [], totalitems: 0, totalPrice: 0 });
    }

    const existingitem = usercart.items.find(item => item.medicine_uuid===medicine_uuid)

    if(existingitem){
        existingitem.quantity=quantity;
        existingitem.totalprice=existingitem.quantity*existingitem.price
    }
    else{
        const medicine = await medicineschema.findOne({medicine_uuid:medicine_uuid})
        console.log(medicine)
        const newitem ={
            medicine_uuid,
            medicinename:medicine.medicie_name,
            quantity,
            price:medicine.medicine_price,
            totalprice:quantity*medicine.medicine_price
        };

        usercart.items.push(newitem);
        usercart.totalitems+=1;
    }

    usercart.totalprice=usercart.items.reduce((acc,items)=>acc+items.totalprice,0);
    await usercart.save();
    res.json(usercart)
}


const cart = async (req,res)=>{
    const{user_uuid}=req.params
    console.log(user_uuid)
    const cartdetails= await cartschema.findOne({
        user_uuid:user_uuid
    })
    
    if(cartdetails){
        return res.status(200).json({data:cartdetails})
    }
    else{
        return res.status(400).json({message:'cart has empty'})
    }
}


    const deleteitem = async(req,res)=>{
        const {user_uuid,medicine_uuid}= req.params
        const cart = await cartschema.findOne({
            user_uuid:user_uuid
        })

        if(cart){
            cart.items= cart.items.filter((item)=>item.medicine_uuid!=medicine_uuid)
            cart.totalitems-=1;
            cart.totalprice=cart.items.reduce((acc,item)=>  acc+item.totalprice ,0);

            await cart.save();
            res.json(cart)

        }
        else{
            res.status(404).json({message:'cart not found'})
        }

    }




    const cartquantity= async (req,res)=>{
        const{user_uuid}= req.params

        const{medicine_uuid,quanitity}=req.body

        const cart = await cartschema.findOne({
            user_uuid:user_uuid
        })

        if(cart){
           const item = cart.items.find(item=> item.medicine_uuid===medicine_uuid)
           
           if(item){
            item.quantity=quanitity;
            item.totalprice= item.quantity * item.price;
            cart.totalprice=cart.items.reduce((acc,item) => acc+item.totalprice,0)

            await cart.save();
            res.json(cart);
           }
           else{
            res.status(404).json({message:'Item not found'})
           }
           
        }

        else{
            res.status(404).json({message:'Cart not found'})
        }
    }



module.exports = {cartcontroller,cart,deleteitem,cartquantity}