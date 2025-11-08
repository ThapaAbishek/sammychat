import User from "../models/user.model.js";
import Message from "../models/user.message.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar=async(req,res)=>{
    try{
const loggedInUserId=req.user._id;
const filterUsers=await User.find({_id: {$ne:loggedInUserId}}
).select("-password");

res.status(200).json(filterUsers);
    }
    catch(error){
console.error("Error in get user by side bar",error.message);
res.status(500).json({error:"internal server error"});
    }
}

export const getMessages=async(req,res)=>{
    try{
 const {id:userToChatId}=req.params
 const myId=req.user._id;

 const message=await Message.find({
    $or:[
        {senderId:myId , receiverId:userToChatId},
        {senderId:userToChatId, receiverId:myId}
    ]
 })
 res.status(200).json(message)
    }
    catch(error){
console.error("error in get message controller",error.message);
res.status(500).json({message:"internal server error"});
    }
}

export const sendMessage=async(req,res)=>{
    try{
        console.log("text send");
     const {text,image}=req.body;
     const {id:receiverId}=req.params;
     const senderId=req.user._id;
    
     
     let imageURl;

     if(image){
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageURl=uploadResponse.secure_url;
     }
     const newMessage=new Message({
senderId,
receiverId,
text,
image:imageURl,
     });
     await newMessage.save();

     //todo: 

     res.status(200).json(newMessage);
    }
catch (error) {
  console.error("error in send message controller", error.message);
  res.status(500).json({ message: "Internal server error" });
}

}