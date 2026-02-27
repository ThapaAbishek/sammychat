import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app=express();
const PORT = process.env.PORT || 5001;
 connectDB();
app.use(cors({
   origin:process.env.CLIENT_URL || "http://localhost:5173",
   credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is responding at port:" + PORT);
});
