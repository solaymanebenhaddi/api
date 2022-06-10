import express from "express";
//npm i dotenv
import dotenv from "dotenv";
// npm i mongoose
import mongoose from "mongoose";
import authRout from "./routes/auth.js"
import propertysRout from "./routes/propertys.js"
import usersRout from "./routes/users.js"
import roomsRout from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
dotenv.config();
// manage connection to DB :
const port = process.env.PORT || 8800;

const connect = async()=>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to Mongodb")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{

    console.log("mongoDb disconnected")
    
})
// connected 
mongoose.connection.on("connected",()=>{
    console.log("mongoDb connected");
    
})

// middlewares
//app.use(express.static("."));

app.use(cors())
app.use(cors({ origin: true }));

app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authRout)
app.use("/api/users",usersRout)
app.use("/api/propertys",propertysRout)
app.use("/api/rooms",roomsRout)
// this middleware is handling error in our apps
app.use((err,req,res,next)=>{
    const errorStatus= err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success :false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})


// send and recive req from client side :
app.get("/",(req,res)=>{
    res.send("hello first request "+ mongoose.connection.readyState)
    
})
// calling connect function :
app.listen(port,()=>{
    connect();
     console.log("welcome to the backend again   ")
})