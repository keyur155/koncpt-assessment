import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()


// middleware set- up 
app.use(cors())
app.use(express.json({
    limit: '20kb', 
}));

app.use(cookieParser());

// request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});


// auth import

import authRoute from "./routes/auth.route.js";

app.use("/api/v1/auth",authRoute);

// Task import
import tasksRoute from "./routes/tasks.route.js"

app.use("/api/v1/task", tasksRoute);






export {app}