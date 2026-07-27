import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    username :{
        type :String,
        trim :true,
        index : true,
        required : true,
    },
    email :{
        type :String,
        trim :true,
        index : true,
        required : true,

    },
    password :{
        type : String,
        trim:true,
        minlength: 8,
        required : true,
    },
    role: {
        type :String,
        enum :['admin', 'user'],
        default :"user"
        
    },
    refreshToken :{
        type : String,
        default : "",
       },
},
{
    timestamps:true
});


userSchema.pre('save', async function (){
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);

});

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (){
     return jwt.sign(
        { _id: this._id  , username : this.username},
        process.env.ACCESS_TOKEN_SECRET || "dev-access-secret",
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
        }
      );
}

userSchema.methods.generateRefreshToken = function (){
     return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret",
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
        }
      );
}

const User  = mongoose.model("User" ,userSchema);
export default User;

