
import User from "./../models/user.model.js";
import ApiError from "./../utils/apiError.js";
import ApiResponse from "./../utils/apiResponse.js";
import  asyncHandler from "./../utils/asynHandler.js";
import {options } from "./../constants.js"

export const signUp = asyncHandler(async(req , res) =>{
    const{username,email , password} = req.body;

   if ([username ,email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    const existUser = await User.findOne({
        email : email
    });
   

    if(existUser){
        throw new ApiError(409, "User Already Exist");
    }

     const savedUser =  new User({
                            username : username,
                            email : email,
                            password :password
                        });
    await savedUser.save();


    return res.status(201)
              .json(new ApiResponse(201,"User Created Successfully"))
    
});

export const signIn = asyncHandler(async(req , res) =>{
    const {email , password} = req.body ;

     if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "email and password fields are required");
    }

    const user = await User.findOne({
        email : email
    });

    if(!user){
         throw new ApiError(400, "User Not Registered With Us!")
    }
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if(isPasswordCorrect){
           const access_token = user.generateAccessToken();
           const refresh_token = user.generateRefreshToken();

            user.refreshToken = refresh_token;
            await user.save();
            const userResponse = user.toObject();
            delete userResponse.password;
            delete userResponse.refreshToken;

           return res.status(200)
            .cookie("accessToken", access_token, options)
            .cookie("refreshToken", refresh_token, options)
            .json(new ApiResponse(200,"login successfull",{userResponse , access_token}))
           
    }
    else {
        throw new ApiError(400,"Invalid Credentials");
    }



});

