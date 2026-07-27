import Task from "../models/task.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asynHandler.js";


export const getTasks = asyncHandler(async (req , res) =>{
    const _id = req.user._id;

    const {status , priority ,sort ,page =1 , limit = 10} = req.query ;

    const query ={
        user , _id
    }

    if(status){
        query.status = status
    }
     if(priority){
        query.priority = priority
    }

    const sortOption = {};

     if (sort) {
        if (sort.startsWith("-")) {
            sortOption[sort.substring(1)] = -1;
        } else {
            sortOption[sort] = 1;
        }
    } else {
        sortOption.createdAt = -1;
    }

    const Tasks = await Task.find(query)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

    const totalTasks = await Task.countDocuments(filter);

    return res.status(200)
    .json(new ApiResponse(200,"successfully fetched tasks",Tasks) ,
    {
            Tasks ,totalTasks ,  currentPage: Number(page),
            totalPages: Math.ceil(totalTasks / limit)
    });

    

});

export const addTask = asyncHandler(async(req , res) =>{
    
     const {title ,description , priority , status ,dueDate} = req.body;
     const _id = req.user._id ;

    if ( !title?.trim() || !description?.trim() || !dueDate) {

        throw new ApiError(400, "All fields are required");
    }


    const due = new Date(dueDate);

    if (due < new Date()) {
         throw new ApiError(400, "Due date cannot be in the past");
    }

     const task = new Task({
        user : _id,
        title : title,
        description : description,
        priority : priority,
        status : status,
        dueDate : dueDate
     });

     await task.save();


     return res.status(201)
     .json(new ApiResponse(201,"Successfully Insert Task"))

})

export const editTask = asyncHandler(async(req , res) =>{
    const { taskId } = req.params;
    const _id = req.user._id ;

     const { title, description, priority, status, dueDate } = req.body;

      if ( !title?.trim() || !description?.trim() || !dueDate) {

        throw new ApiError(400, "All fields are required");
    }

    const task = await Task.findOne({
        _id: taskId,
        user : _id,
    });

    if(!task) {
        throw new ApiError(404 , "Task not found")
    }

    if (dueDate) {
        const due = new Date(dueDate);

        if (due < new Date()) {
            throw new ApiError(400, "Due date cannot be in the past");
        }

        task.dueDate = due;
    }

    if(title){
        task.title = title ;
    }

    if(description){
        task.description = description ;
    }

    if (priority) {
        task.priority = priority;
    }

    if (status) {
        task.status = status;
    }

    await task.save();

    return res.status(200)
    .json(200,"Task Updated Successfully", task);


})

export const deleteTask = asyncHandler(async(req , res) =>{
    const { taskId } = req.params;
    const _id = req.user._id ;

    const deleteTask = await Task.findByIdAndDelete({
        _id : taskId,
        user : _id
    });

    return res.status(200)
    .json( new ApiResponse(200 ,"Task Deleted Succesfully"))
    
})



