const express = require('express')
const http = require('http')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authRouter = require("./routes/auth");
const app =  express()
const logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')
// const passport = require('passport');

 var corsOption = {
    origin: '*'
 }

 app.use(cors(corsOption));
 app.use(logger("dev"));

 //parse requests of  content-type - application/json
 app.use(express.json())
 
 //parse requests of  content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({extended: true}))
 
 app.use("/api", authRouter);


 const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_URI
 })




 app.use(session({
 resave: false,
 saveUninitialized: false,
 secret: 'SECRET',
 store: mongoStore,
 cookie: { maxAge: 60000 } // Set the cookie max age in milliseconds
 }));

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log(`serving running on port 5000 `);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })
