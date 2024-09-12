const cartschema = require('../../modules/cartschema')
const medicineschema= require('../../modules/admin/addmedicine')
const testschema = require('../../modules/admin/addlabtest')
const labschema = require('../../modules/labcartschema')



const cartcontroller = async(req,res)=>{
 const{user_uuid,medicine_uuid,quantity,shop_uuid}= req.body
 let usercart = await cartschema.findOne({
    user_uuid:user_uuid
 })

    
     if (!usercart) {
      usercart = new cartschema({ user_uuid,shop_uuid, items: [], totalitems: 0, totalPrice: 0 });
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

    const labcart = async (req,res)=>{
        try{
        const {user_uuid, lab_uuid, test_uuid} =  req.body

        let labusercart = await labschema.findOne({user_uuid});

        if(!labusercart){
            labusercart = new labschema({user_uuid,lab_uuid, test : [], totalitems : 0, totalprice:0})
        } 
        console.log(test_uuid)
        const test = await testschema.findOne({test_uuid});
        
        if(!test){
            return res.status(404).json({message:'Test not found'})
        }

        const existingtest = labusercart.test.find(item => item.test_uuid=== test_uuid);

        if(existingtest){
            return res.status(400).json({
                message:'test already added'
            })
        }

        else{
            const newtest = {
                test_uuid:test.test_uuid,
                test_name:test.test_name,
                price:test.price,
                type:test.type,
                sub_test:test.type === 'Profile' ? test.included_tests.map(subtest =>({
                    sub_test_uuid:subtest,
                    sub_test_name:subtest,
                    sub_test_price:test.price
                })):[],
                totalitems:1,
                totalprice:test.price
            }
                labusercart.test.push(newtest);
                labusercart.totalitems += 1;
        }
        labusercart.totalprice = labusercart.test.reduce((acc,item)=> acc + item.totalprice, 0);

        await labusercart.save();

        res.json(labusercart);
        
    }
    catch(error){
        res.status(500).json({
            message:'server error',
            error:error
        })
    }

}


    const getlabcart = async(req,res)=>{
        const {user_uuid} = req.params;

        try{
            const cart = await labschema.findOne({user_uuid:user_uuid})

            if(!cart){
                return res.json(400).json({
                    message:'cart not there'
                })
            }
            else{
                return res.status(200).json({
                    message:'succussfull',
                    data:cart
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message:'server error'
            })
        }

    } 


    const deletetest = async (req,res)=>{
        const {user_uuid,test_uuid}= req.params

        const cart = await labschema.findOne({user_uuid:user_uuid})

        if(!cart){
            return res.status(404).json({
                message:'cart not found'
            })
        }
        else{
            cart.test = cart.test.filter(item => item.test_uuid !== test_uuid);
            cart.totalitems -= 1;
            cart.totalprice = cart.test.reduce((acc,item)=>acc+item.totalprice,0);
            await cart.save();
            return res.status(200).json({
                message:'success',
                data:cart
            })
        }
    }




module.exports = {cartcontroller,cart,deleteitem,cartquantity, labcart, getlabcart, deletetest}