import mongoose from "mongoose";
import dotenv from "dotenv";
import Lawyer from "./models/Lawyer.js";
import Journal from "./models/Journal.js";
import Video from "./models/Video.js";
import { mockLawyers, mockJournals, mockVideos } from "./mockData.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    await Lawyer.deleteMany({});
    await Journal.deleteMany({});
    await Video.deleteMany({});

    await Lawyer.insertMany(mockLawyers);
    await Journal.insertMany(mockJournals);
    await Video.insertMany(mockVideos);

    console.log("🌱 Seeded lawyers, journals, and videos successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
