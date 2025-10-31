import express from "express";
import Journal from "../models/Journal.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* ───────────────────────────────
   1. Get all journals
──────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ published_date: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journals", error });
  }
});

/* ───────────────────────────────
   2. Get one journal by ID
──────────────────────────────── */
router.get("/:id", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal)
      return res.status(404).json({ message: "Journal not found" });
    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal", error });
  }
});

/* ───────────────────────────────
   3. Add new journal (Admin only)
──────────────────────────────── */
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newJournal = new Journal(req.body);
    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (error) {
    res.status(500).json({ message: "Failed to add journal", error });
  }
});

/* ───────────────────────────────
   4. Update journal (Admin only)
──────────────────────────────── */
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Journal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Journal not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update journal", error });
  }
});

/* ───────────────────────────────
   5. Delete journal (Admin only)
──────────────────────────────── */
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Journal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Journal not found" });
    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete journal", error });
  }
});

export default router;
