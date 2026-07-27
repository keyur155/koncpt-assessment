import {app} from "./app.js"
import { db_connect } from "./config/db_connect.js"
import  dotenv  from "dotenv";
dotenv.config()

const port = process.env.PORT ;
db_connect()
.then(     
   app.listen(port,()=>{
      console.log(`server is running on ${port}`);
   })
)
.catch(err=>()=>{
   console.error("Failed to connect to MongoDB:", err);
})