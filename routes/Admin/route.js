const route = require('express')
const router = route.Router()
const addshop = require('../../controller/admin/addshop')
const addmedicine = require('../../controller/admin/addmedicine')
const messages = require('../../utils/constant')
const location = require('../../controller/admin/nearbyshop')
const medicineprice= require('../../controller/admin/medicineprice')
const { successResponse, errorResponse } = require('../../utils/response')
const addlabtest = require('../../controller/user/addlabservices')
const {shopslogin,shopgetorders} = require('../../controller/admin/shopslogin')
const addtest = require('../../controller/admin/addtest')


router.post('/addshop',  async(req,res)=>{
    let response;
    try{
        response = await addshop(req,res);
        return res.status(201).json(response);
    }
 catch(error){
    console.log(error) 
    return res.status(500).json(errorResponse(500, messages.error.WRONG))
 }
})



      router.post('/addmedicine', async (req,res)=>{
         let response;
         try{
            response = await addmedicine(req,res);
            return res.status(201).json(response)
         }
         catch(error){
            console.log(error)
            return res.status(500).json(errorResponse(500, messages.error.WRONG))
         }
      })

      router.post('/medicineprice',async (req,res)=>{
         let response;
         try{
            response = await medicineprice(req,res);
            return res.status(201).json(response)
         }
         catch(error){
            console.log(error)
            return res.status(500).json(errorResponse(500, messages.error.WRONG))
         }
      })

      router.post('/getuser/details',addlabtest)

      router.post('/shop/login',shopslogin)
      router.get('/shop/getorders/:shop_uuid',shopgetorders)
      router.post('/addtest',addtest)

   /*router.post('/nearbyshops', async(req,res) =>{
 let response;
 try{
    response = await location(req,res);
    return res.status(201).json(response);
 }
 catch{
    console.log(error)
    return res.status(500).json(errorResponse(500, messages.error.WRONG))
 }
}) */

module.exports = router