
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {app} from './../app.js'
dotenv.config()


const db_connect = async()=>{
   try {
     const connection_instace = await mongoose.connect(
        `${process.env.MONGO_URI}`
    );
    app.on('error', (err)=>{
      console.log("Server error:", err);
    });
    console.log("MongoDb connected");
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
   }
   

}

export {db_connect}