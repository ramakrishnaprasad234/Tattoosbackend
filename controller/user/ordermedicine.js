

const orderschema = require('../../modules/ordermedicine')

const medicineorder = async ()=>{

    try{
        const payloaad ={
            
        }
        const orders = await orderschema(payloaad)

    }
    catch(error){
        res.status.json({
            message:error
        })
    }

}
module.exports = medicineorder