import { Router } from "express";
import {addTask, getTasks ,editTask ,deleteTask} from "./../controllers/tasks.controller.js";
import {verifyJWT} from "./../middleware/auth.middleware.js";

const route = Router();

route.get("/get-tasks", verifyJWT, getTasks);

route.post("/add-task", verifyJWT, addTask);

route.put("/edit-task/:taskId", verifyJWT, editTask);

route.delete("/delete-task/:taskId", verifyJWT, deleteTask);

export default route
