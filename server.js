const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const registerRoute = require('./Routes/registrationrouters')
const styleRoutes = require('./Routes/tattooStyleRoute')
const bookingRoutes = require('./Routes/bookingroute')
const tattooStyleRoutes = require('./Routes/tattooStyleRoute');
const artistRoutes = require('./Routes/artistRoute');
const designRoutes = require('./Routes/designRoutes')
const tattooRoutes =require('./Routes/tattooRoutes')
const contactRoutes = require('./Routes/contectroutes')
const profileRoutes = require('./Routes/profileRoute')
const cartRoutes = require('./Routes/Cartroutes')
const cors = require('cors')


const app = express()

const port = 5000

dotenv.config()
app.use(express.json());
app.use(bodyparser.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{
    console.log(`mongodb connection error ${error}`)
})

app.get('/', (req, res) => {
  res.send('Welcome to the Tattoo API!');
});

// app.use('/auth', login);

app.use('/register',registerRoute)

app.use('/Login',registerRoute)

app.use('/auth', registerRoute);

app.use('/tattooStyles', tattooStyleRoutes);

app.use('/artists', artistRoutes);

app.use('/style', styleRoutes);

app.use("/api/designs", designRoutes);

app.use('/bookings', bookingRoutes);

app.use('/api/tattoos', tattooRoutes);

app.use('/api', contactRoutes);

app.use('/pro',profileRoutes)

app.use('/cart',cartRoutes)

app.listen(port,(req,res)=>{
    console.log("server connected successful")
})

