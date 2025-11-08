import mongoose from "mongoose";

export const connectDB=async ()=>{
try{
const conn=await mongoose.connect(process.env.MONGOOSE_URI);
console.log(`mongoose connected:${conn.connection.host}`);
}
catch(error){
console.log("mongoDB connection error",error);
process.exit(1);
}
}