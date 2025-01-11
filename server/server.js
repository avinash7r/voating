import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./src/utils/connectDB.js";
import authRoutes from "./src/auth/auth.routes.js";
import userRoutes from "./src/user/user.routes.js";
import adminRoutes from "./src/admin/admin.routes.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});