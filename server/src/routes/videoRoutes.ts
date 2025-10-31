import express from "express";
import Video from "../models/Video.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* ───────────────────────────────
   1. Get all videos
──────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error });
  }
});

/* ───────────────────────────────
   2. Get one video by ID
──────────────────────────────── */
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video", error });
  }
});

/* ───────────────────────────────
   3. Add new video (Admin only)
──────────────────────────────── */
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Failed to add video", error });
  }
});

/* ───────────────────────────────
   4. Update video (Admin only)
──────────────────────────────── */
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Video not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update video", error });
  }
});

/* ───────────────────────────────
   5. Delete video (Admin only)
──────────────────────────────── */
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video", error });
  }
});

export default router;
