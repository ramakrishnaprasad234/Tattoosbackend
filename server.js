const express = require('express');
//const mongoose = require('mongoose');
   const approute = require("./routes/user/route")
   // const approute = require('../../medicine backend/routes/route.js')
const app = express();
const mongodb = require('./database/database')
const bodyparser = require('body-parser')
const cors = require('cors')
const admin = require("./routes/Admin/route")
require("dotenv").config();

// Ensure the path is correct
    mongodb.createDbConnection()

/*mongoose.connect('mongodb+srv://root:root@cluster0.p5wso0a.mongodb.net/')
.then(() => console.log("DB connected"))
.catch(err => console.log("DB connection error:", err));   */


    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))
   app.use(cors());
    //app.use(express.json());

   app.use('/admin',admin)
   
    app.use('/api', approute);

   app.get('/', (req, res) => {
    res.send("running server");
});

app.listen(4000, () => {
    console.log("Server started on port 4000");
}); 
