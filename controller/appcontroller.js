const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const optgenerator = require('otp-generator')
require('dotenv').config();
const {Email,PASSWORD} = require('../routes/env.js')
const signup = async (req,res) =>{

  let testaccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: testaccount.user,
          pass: testaccount.pass,
        },
      });


      
        // send mail with defined transport object
         let message =  {
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: "penchalagopi7396@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        };
      
       transporter.sendMail(message).then((info) =>{
        return res.status(201).json({
          msg :"you should recieve message",
          info:info.messageId,
          preview:nodemailer.getTestMessageUrl(info)
        })
       }).catch(errror =>{
     //   res.status(500).json({eroor:"message"})
       })
}

const bill = (req,res) =>{

  const {UserEmail} = req.body;

    let config ={
        service:'gmail',
        auth:{
            user:process.env.Email,
            pass:process.env.PASSWORD
        }
    }

    let otp = optgenerator.generate(6,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})

    let transporter = nodemailer.createTransport(config)

    let Mailgenerator = new Mailgen({
      theme:"default",
      product:{
        name:"Mailgen",
        link:'https://mailgen.js/'
      }
    })


    let response = {
       body:{ 
         name:"Gopi",
      intro:"Your bill has succes",
      table:{
        data:[
         {
          item:"gyu",
          discripton:{otp}
         }
        ]
      }
    }}

    let mail = Mailgenerator.generate(response)


    let message = {
      from:Email,
      to:UserEmail,
      subject:"jubhs",
      html:`${otp}`
    }

    transporter.sendMail(message).then(() =>{
      return res.status(201).json({
        msg:"you should recive an email"
      })
    }).catch(Error =>{
      return res.status(500).json({Error})
    })

  //  res.status(201).json("bill generator")
}

module.exports ={signup, bill}