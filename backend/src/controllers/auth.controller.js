import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/util.js";
import cloudinary from '../lib/cloudinary.js';
export const signup=async(req,res)=>{
const {fullName,email,password}=req.body;
try{
    if(!fullName||!email||!password){
          return res.status(400).json({message: "all fields are required"});
    }
if(password.length < 6){
    return res.status(400).json({message: "password must be greater then 6"});
}
const user =await User.findOne({email})
if(user) return res.status(400).json({message:"Email already exist"});

const salt =await bcrypt.genSalt(10);
const hashedPassword =await bcrypt.hash(password,salt);
 
const newUser= new User({
fullName:fullName,
email:email,
password:hashedPassword
})
if(newUser){
//generate web token
await newUser.save();
generateToken(newUser._id,res)


res.status(201).json({
   _id:newUser._id,
   fullName:newUser.fullName,
   email:newUser.email,
   profilePic:newUser.profilePic, //something has been created sucessfully
})

}
else{
    res.status(400).json({message:"Invalid user data"});
}
}
catch(error){
console.log("error in sigup controller",error.message);
res.status(500).json({message:"Internal server error"})
}
}


export const login=async(req,res)=>{

    const{email, password}=req.body;
    
    try{
const user=await User.findOne({email});
if(!user){
   return res.status(400).json({message:"invalid credentials"});
}
const ispasswordCorrect=await bcrypt.compare(password,user.password);
if(!ispasswordCorrect){
    return res.status(400).json({message:"invalid credentials"});
}
generateToken(user._id,res)
res.status(200).json({

_id:user._id,
fullName:user.fullName,
email:user.email,
profilePic:user.profilePic,
})
    }
    catch(error){
console.log("invalid credentials",error.message);
    }
}
export const logout=(req,res)=>{
    try{
res.cookie("jwt","",{maxAge:0});

res.status(200).json({message:"user logout successfully"});
    }
catch(error){
    console.log(error.message);
}
}

export const updateProfile=async (req,res)=>{
    try{
const {profilePic}=req.body;
const userId=req.user._id

if(!profilePic){
    return res.status(400).json({message:"profile pic is required"});
}
 const uploadResponse= await cloudinary.uploader.upload(profilePic);
 const updatedUser=await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
   
 return res.status(200).json(updatedUser)

}
    catch(error){
console.log("error in update profile",error)
    }
}
export const checkAuth=(req,res)=>{
    try{
res.status(200).json(req.user)
    }
    catch(error){
console.log("error in checkAuth Controller",error.message)
    }
}
