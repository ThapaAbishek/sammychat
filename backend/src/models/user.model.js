import mongoose from"mongoose";

const userSchema=new mongoose.Schema(
    {
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
      type:String,
      require:true,
     unique:false,
    },
fullName:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
    minlength:6,
},
profilePic:{
    type:String,
    default:"",
},
    },
    {timestamps: true}
);
const user=mongoose.model("User",userSchema);
export default user;