import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";

import projectRoutes from "./Routes/ProjectRoutes";
import teamMembersRoutes from "./Routes/TeamMembersRoutes";
import userRoutes from "./Routes/UserRoutes";
import uploadRoutes from "./Routes/UploadRoutes"; 
import uploadSubImageRoutes from "./Routes/uploadSubImageRoutes";
import adminService from "./Routes/ServiceRoutes";

const app: Application = express();

app.use(cors({
  origin: [
    'https://design-architecture-fe.vercel.app',     
    'http://localhost:5173',                  
    'http://localhost:3000',
    'http://localhost:9000'                   
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,                          
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

// connect mongodb 
connectDB();

app.get("/", (req: Request, res: Response): void => {
  res.send("WELCOME TO LAHIRU CAD STORE API!");
});

// Api routes
app.use("/api/projects", projectRoutes);
app.use("/api/team-members", teamMembersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/subImagesUpload", uploadSubImageRoutes)
app.use("/api/services", adminService)
// app.use("api/sub")
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/subImagesUpload", express.static("subImagesUpload"))


app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});