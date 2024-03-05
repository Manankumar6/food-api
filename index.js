require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require('./db')
const PORT = process.env.PORT ||  8080;

// let's tackle cors
const corsOptions = {
    origin: 'http://localhost:3000',
   methods: "GET,POST,PUT,DELETE, PATCH,HEAD",
   credential:true
  }
app.use(cors(corsOptions));

app.use(express.json())
app.use("/api", require("./Router/User"))
app.use("/api", require("./Router/DisplayFood"))
app.use("/api", require("./Router/OrderData"))

app.get('/',(req,res)=>{
    res.send("hello world ")
    
})

connectDB();
app.listen(PORT,()=>{
    console.log(`App is listening on the port ${PORT}`)
})