const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const categoryRoute = require('./routes/category');
const newsRoute = require('./routes/news')
const eventRoute = require('./routes/event')
const hostRoute = require('./routes/host')
const formData = require('express-form-data')
const notificationRoute = require('./routes/notification')
const ticketRoute = require('./routes/tickets')
const payRoute = require('./routes/pay')
const webhookRoute = require('./routes/webhook')
//const productCategoryRoute = require('./routes/productCategory')
//const productRoute = require('./routes/products')
const refRoutes = require('./routes/reference')
//const wishRoutes = require('./routes/wishlist')
const restify = require('restify');


//const fetch = require('node-fetch')
require('dotenv').config()
const uri = 'mongodb+srv://Davidezeh:StrongPassWord2003@cluster0.qriiurj.mongodb.net/TEST?retryWrites=true&w=majority'

async function connect (){
  try {
    await mongoose.connect(uri /*{useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}*/)
    console.log('connected to mongo DB')
  } catch (error){
    console.log(error)
  }
}

connect();
//DB Connection
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch((error) => {
//     console.log("Database is not connected");
//     console.log(error)
//   });

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose Connected");
// });





// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(formData.parse());
// Basic Testing Purposes
app.get("/", (req, res) => {
  res.json({
    author: "David Ezeh",
    stack: ["Nodejs", "Mongodb", "express"],
    project_name: "Busa"
  });
});

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const emailSubscriberRoutes = require("./helper/sendEmail");

// Use Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
//app.use("/api", emailSubscriberRoutes);
app.use('/api/category',categoryRoute)
app.use('/api/news', newsRoute)
app.use('/api/event',eventRoute)
app.use('/api/host',hostRoute)
app.use('/api/notification',notificationRoute);
app.use('/api/tickets',ticketRoute)
app.use('/api/pay',payRoute)
app.use('/api',webhookRoute)
//app.use('/api/productCategory',productCategoryRoute)
//app.use('/api/products',productRoute)
app.use('/api/reference',refRoutes)
app.use(restify.plugins.bodyParser());
//app.use('/api/wishlist', wishRoutes)
// PORT
const port = process.env.PORT || 3030;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

