import express from "express";
import mongoose, { Error } from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import assetrouter from "./router/assetDetail.router";
import userRouter from "./router/user.router";
import empRouter from "./router/EmpDetail.router";
import dotenv from "dotenv";


dotenv.config();
const app = express()
const port =  6001 || process.env.PORT
app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = { 
    // origin: 'http://localhost:5000',---
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, PATCH,  POST, DELETE"
}

app.use(cors(corsOptions));

app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
}) 
mongoose.connect(process.env.MONGO_URL)

 .then(()=>{
    console.log("Database Connected Successfuly!!!!")})
 .catch((err)=>{ 
    console.log("Error:",err)})

    app.use('/assets',assetrouter)
    app.use('/user',userRouter)
    app.use('/employee',empRouter)