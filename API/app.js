import express from 'express';
import  dotenv  from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

const app =express();
dotenv.config();


const connect = async ()=>{
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB");
    } catch (err) {
        throw err
    }
}

//middlewares
app.use(cors())
app.use(express.json());
app.use(cookieParser())

//Router
import usersRoute  from './Routes/users.route.js'
app.use('/users',usersRoute)
import roomsRoute  from './Routes/rooms.route.js'
app.use('/rooms',roomsRoute)
import hotlesRoute  from './Routes/hotels.route.js'
app.use('/hotels',hotlesRoute)
import authRoute  from './Routes/auth.route.js'
app.use('/auth',authRoute)

// err handling
app.use((err,req,res,next)=>{
    const errorStatus = err.status||500;
    const errorMessage = err.message||"Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})



app.listen(8000,()=>{
    connect();
    console.log('app is Runnind on 8000');
})