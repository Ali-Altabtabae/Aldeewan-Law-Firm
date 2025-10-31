import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import lawyerRoutes from "./routes/lawyerRoutes";
import journalRoutes from "./routes/journalRoutes";
import videoRoutes from "./routes/videoRoutes";
import adminRoutes from "./routes/adminRoutes"; 
import { Request, Response } from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/lawfirm")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Law Firm API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
