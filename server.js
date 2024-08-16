const express = require('express');
//const mongoose = require('mongoose');
   const approute = require("./routes/user/route")
   // const approute = require('../../medicine backend/routes/route.js')
const app = express();
const mongodb = require('./database/database')
const bodyparser = require('body-parser')
const cors = require('cors')
const cookies= require('cookie-parser')
const admin = require("./routes/Admin/route")
const http=require('http')
const socketio = require('socket.io')
const Order =require('./modules/order')
require("dotenv").config();
app.use(cookies())
// Ensure the path is correct
    mongodb.createDbConnection()

/*mongoose.connect('mongodb+srv://root:root@cluster0.p5wso0a.mongodb.net/')
.then(() => console.log("DB connected"))
.catch(err => console.log("DB connection error:", err));   */


    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))
   app.use(cors());
    //app.use(express.json());

    const server = http.createServer(app)

    const io = socketio(server);

    io.on('connection',(socket)=>{
        console.log('A shop has connected')

        socket.on('joinshop',(shopid)=>{
            socket.join(shopid);
            console.log('shop has connected')
        })

        Order.watch().on('change',(change)=>{
            if(change.operationType==='insert'){
                const orderData = change.fullDocument;
            const shopId = orderData.shopId; 

            io.to(shopId).emit('newOrder', orderData);
            }
        })
    })


   app.use('/admin',admin)
   
    app.use('/api', approute);

   app.get('/', (req, res) => {
    res.send("running server");
}); 

app.listen(4000, () => {
    console.log("Server started on port 4000");
}); 
