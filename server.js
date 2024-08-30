const express = require('express');
  const approute = require("./routes/user/route")
const app = express();
const mongodb = require('./database/database');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookies = require('cookie-parser');
const admin = require("./routes/Admin/route");
const http = require('http');
const socketio = require('socket.io');
const Order = require('./modules/order');
require("dotenv").config();

app.use(cookies());
mongodb.createDbConnection();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*',  // Set to your frontend origin or use '*'
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A shop has connected');

    socket.on('joinshop', (shopId) => {
        socket.join(shopId);
        console.log('Shop has connected to room:', shopId);
    });

    Order.watch().on('change', (change) => {
        if (change.operationType === 'insert') {
            const orderData = change.fullDocument;
            const shopId = orderData.shop_uuid;
            io.to(shopId).emit('newOrder', orderData);
        }
    });
});

app.use('/admin', admin);
app.use('/api', approute);

app.get('/', (req, res) => {
    res.send("running server");
});

server.listen(4000, () => {
    console.log("Server started on port 4000");
});