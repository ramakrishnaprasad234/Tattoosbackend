
const route = require('express')
const router = route.Router();
const registraionvalidator = require('../../middlewares/registraionvalidator.js')
const OtpGenerate = require('../../controller/user/registerotp.js')
const {signup, bill} = require('../../controller/appcontroller.js')
const registerUser = require('../../controller/user/registration.js')
const { successResponse, errorResponse } = require("../../utils/response.js");
const{register} = require('../../controller/auth.js');
const  messages  = require('../../utils/constant.js');
const registerotp = require('../../middlewares/registerotp.js');
const { required } = require('../../utils/registartion.joi.js');
 const  otpverify = require('../../middlewares/verifyotp.js')
 const verifyotp = require('../../controller/user/verifyotp.js')
 const location = require('../../controller/admin/nearbyshop.js')
 const shopbycity = require('../../controller/user/shopbycity.js')
 const getsingleshop = require('../../controller/user/getsingleshop.js')
const allmedicines = require('../../controller/user/allmedicines.js')
const singlemedicine = require('../../controller/user/singlemedicine.js')
const getallshops = require('../../controller/user/getallshops.js')
const medicineorder = require('../../controller/user/ordermedicine.js')
// const Availabile = require('../../modules/availability.js');
const addavailability = require('../../controller/addvailability.js')
const shopavailability = require('../../controller/availability.js')
const registerlab = require('../../controller/admin/addlabs.js')
const bloodbank = require('../../controller/admin/addbloodbanks.js')
const labsbycity = require('../../controller/user/labsbycity.js')
const bloodbanksbycity = require('../../controller/user/bloodbaksbycity.js')
const getsinglebloodbank = require ('../../controller/user/singlebloodbank.js')
const getsinglelab = require('../../controller/user/getsinglelab.js')
const getuserdetails = require('../../controller/user/getuserdetails.js')
const getlabservices = require('../../controller/user/getlabservices.js')
const {cartcontroller,cart,deleteitem,cartquantity} = require('../../controller/user/cartdetails.js')
const axios = require('axios')
const neworder = require('../../controller/user/neworder.js')
const orderschema = require('../../modules/order.js')
const medicinesearch = require('../../controller/user/medicinesearch.js')
const priscription = require('../../modules/uploadpriscription.js')
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3')
const { S3Client}= require('@aws-sdk/client-s3');
const {Upload} = require('@aws-sdk/lib-storage')
const path = require('path')
require("dotenv").config();



const storage = multer.memoryStorage();
const upload = multer({storage})

const s3Client = new S3Client({
  region:'ap-south-1',
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
  },
})



// const upload = multer({
//     storage:multers3({
//       s3,
//       bucket:'s.p.medicine.images',
//       acl:'public-read',
//       // metadata:(req,file,cb)=>{
//       //   cb(null,{fieldName:file.fieldname});
//       // },
//       key:(req,file,cb)=>{
//         cb(null, Date.now().toString() + '-'+ file.originalname);
//       },
//     }),
// });



// const cors = require('cors')
// const http = require('http')
// const socketio = require('socket.io')
// const app = route()
// app.use(cors())
// app.use(route.static('public'))
// const server = http.createServer(app)

// const io = socketio(server)

// const io = socketio(server, {
//   cors: {
//       origin: "file:///D:/mine/medicineapp/socketio/socketio.html", // Replace with your frontend URL
//       methods: ["GET", "POST"]
//   }
// });



// io.on('connection',(socket)=>{
//   console.log('shop is connected');

//   orderschema.watch().on('change',(change)=>{
//     if(change.operationType === 'insert'){
//       const orderdata = change.fullDocument;
//       console.log(orderdata)
//       socket.emit('neworder',orderdata)
//     }
//   })

// })

 // router.post('/user/signup',signup)

 // router.post('/user/bill',bill)
//  ,registraionvalidator

const googleapikey = 'AIzaSyDGGLHzd6fhzFl2PUn7qrqAUFoVLViY66M'


  router.post('/geocode',async (req,res)=>{
    const {adress}= req.body;
    try{
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
        params:{  
          adress,
          key:googleapikey
        }
      });
      res.json(response.data)

    }
    catch(err){
      res.status(500).send(err.message)
    }
  })


  router.post('/directions',async (req,res)=>{
    console.log('coming')
    const {origin,destination}= req.body
    try{
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`,{
        params:{
          origin,
          destination,
          key:googleapikey
        }
      })
      res.json(response.data);
    }
    catch(error){
      res.status(500).send(error.message)
    }
  })



   router.post('/register' ,registraionvalidator , async (req,res)=>{
        try{
            const newUser = await registerUser(req);
            res.send(successResponse(201, messages.success.USER_CREATED, newUser))
        }
        catch(error){
            res.send(errorResponse(409, error.message))
        }
})   



      router.post('/registerotp',registerotp,async(req,res)=>{
        let response;
        try {
          response = await OtpGenerate(req, res);
          
          // res.status(200).json(response)
          res.status(response.code).json(response);
        } catch (error) {
          res.send(errorResponse(500, messages.error.WRONG));
         console.log(error) 
        }

        }
      )  

    router.post('/verifyotp',otpverify,async (req,res)=>{
      let response;
      try{
        response = await verifyotp(req,res);
         res.status(response.code).json(response);
         console.log("executed")
      }

      catch (error) {
        console.log(error)
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



    router.get('/getshopsbycity',async(req,res)=>{
      let response
      try{
        response = await shopbycity(req);
        return res.status(response.code).json(response);
      }
      catch(error){
       console.log(error)
      }
    })

   router.get('/getsingleshop',async (req,res)=>{
    let response
    try{
      response = await getsingleshop(req,res);
      return res.status(response.code).json(response)
    }
    catch(error){
      console.log(error)
    }
   })    

   router.get('/allmedicines',allmedicines)

   router.post('/singlemedicine',singlemedicine)

   router.get('/getallshops',getallshops)

   router.get('/order',medicineorder)


   router.post('/availbility',addavailability)

  //  router.get('/shop/:shopid/medicines', async (req,res)=>{
  //   try{
  //     const availabilemedcine = await Availabile.find({shop:req.params.shopid,available:true})
  //     .populate('medicine');
  //     res.json(availabilemedcine);
  //   }
  //   catch(err){
  //     console.log(err)
  //     res.json({message:err.message})
  //   }
  //  })

   /*  router.post('/generateotp',otpvalidator,async(req,res)=>{
        
     }) */

    router.post('/medicinesin/shop',shopavailability)

    router.post('/lab/register',  async(req,res)=>{
      let response;
      try{
          response = await registerlab(req,res);
          return res.status(201).json(response);
      }
   catch(error){
      console.log(error) 
      return res.status(500).json(errorResponse(500, messages.error.WRONG))
   }
  })

  router.post('/register/bloodbank',bloodbank)


  router.get('/getlabsbycity',async(req,res)=>{
    let response
    try{
      response = await labsbycity(req);
      return res.status(response.code).json(response);
    }
    catch(error){
     console.log(error)
    }
  })

  router.get('/get/bloodnaks/bycity',async(req,res)=>{
    let response
    try{
      response = await bloodbanksbycity(req);
      return res.status(response.code).json(response);
    }
    catch(error){
     console.log(error)
    }
  })
  router.get('/get/userdetails',getuserdetails)
  router.get('/get/single/bloodbank',getsinglebloodbank)
  router.get('/get/single/lab',getsinglelab)
  router.get('/get/lab/services',getlabservices)
  router.post('/cart/details',cartcontroller)  
  router.get('/cart/:user_uuid',cart)
  router.delete('/cart/:user_uuid/:medicine_uuid',deleteitem)
  router.put('/put/cartquantity/:user_uuid',cartquantity)
  router.post('/create/order',neworder)

  router.get('/medicine/search',medicinesearch)
  router.post('/upload',upload.single('file'),async(req,res)=>{
    if(!req.file){
      return res.status(400).json({
        error:'No file uploaded'
      })
    }

    try{

      const fileName = path.basename(req.file.originalname)
      const bucketname = 's.p.medicine.images'
      const uploadparams = {

        client:s3Client,
        params:{
          Bucket:bucketname,
          Key:fileName,
          Body:req.file.buffer,
          ContentType:req.file.mimetype,
        },
      };

      const upload = new Upload(uploadparams)
      await upload.done();

      // const fileurl = `https://${bucketname}.s3.${s3Client.config.credentials.region}.a.amazonaws.com/${}mazonaws.com/${fileName}`;
      // const fileurl =  `https://${bucketname}.s3.amazonaws.com/${fileName}`
      const fileurl = `https://s3.ap-south-1.amazonaws.com/${bucketname}/${fileName}`

      const newpriscription=new priscription({
        user_uuid:'f1b3e696-493e-48ad-9a5c-26284a58270a',
        s3url:fileurl
      }) 

      await newpriscription.save();

      res.status(200).json({
        message:'file uploaded successfully',
        fileurl,
      })

    }

    catch(error){   
      console.log(error)
      res.status(500).json({
        message:'uploading message failed'
      })
    }


  })


module.exports = router