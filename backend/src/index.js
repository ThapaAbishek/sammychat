import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app=express();
const PORT =process.env.PORT;
 connectDB();
app.use(cors({
   origin:"http://192.168.91.205:5173",
   credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.listen(PORT,()=>{
   console.log("Server is responding at port:"+PORT);
  
});