const route = require('express')
const router = route.Router()
const addshop = require('../../controller/admin/addshop')
const messages = require('../../utils/constant')
const location = require('../../controller/admin/nearbyshop')
const { successResponse, errorResponse } = require('../../utils/response')

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


router.post('/nearbyshops', async(req,res) =>{
 let response;
 try{
    response = await location(req,res);
    return res.status(201).json(response);
 }
 catch{
    console.log(error)
    return res.status(500).json(errorResponse(500, messages.error.WRONG))
 }
})

module.exports = router