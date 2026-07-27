import mongoose from "mongoose";
import User from "./user.model.js";
const TaskSchema = new mongoose.Schema({
    user : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "User",
       required: true,
   
    },

    title :{
        type : String,
        required : true, 
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    description :{
        type: String,
        required : true,
        trim: true,
        minlength: 20,
        maxlength: 100
    },
    priority:{
        type: String,
        enum :["Low" , "Medium" ,"High"],
         default: "Medium"
    },
    status:{
        type: String,
        enum:["Pending" ,"In Progress", "Completed"],
         default: "Pending"
    },
    dueDate:{
        type :Date,
        required : true
    },
    completedAt:{
        type :Date,
        required : true

    }

},
    {
        timestamps:true
    }
);

TaskSchema.index({ user: 1, status: 1 });
TaskSchema.index({ dueDate: 1 });

const Task = mongoose.model('Task' ,TaskSchema);

export default Task;
