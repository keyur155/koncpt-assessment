

const asyncHandler = (fn) => async(req, res , next) =>{
    try{
            await fn(req, res, next);
    }
    catch (error){
        if (res.headersSent) {
            return;
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
           
        });
    }
}

export default asyncHandler