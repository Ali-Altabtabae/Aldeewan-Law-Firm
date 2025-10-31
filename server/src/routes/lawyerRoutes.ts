import express from "express";
import Lawyer from "../models/Lawyer.js";
import { verifyAdmin } from "../middleware/auth.js"; // ✅ import middleware

const router = express.Router();

/* ──────────────────────────────────────────────
   🟩 Public: Get all lawyers
────────────────────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json(lawyers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lawyers", error });
  }
});

/* ──────────────────────────────────────────────
   🟩 Public: Get one lawyer by ID
────────────────────────────────────────────── */
router.get("/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json(lawyer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lawyer", error });
  }
});

/* ──────────────────────────────────────────────
   🔒 Admin-only: Add new lawyer
────────────────────────────────────────────── */
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newLawyer = new Lawyer(req.body);
    await newLawyer.save();
    res.status(201).json(newLawyer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add lawyer" });
  }
});

/* ──────────────────────────────────────────────
   🔒 Admin-only: Update lawyer
────────────────────────────────────────────── */
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Lawyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Lawyer not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update lawyer" });
  }
});

/* ──────────────────────────────────────────────
   🔒 Admin-only: Delete lawyer
────────────────────────────────────────────── */
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Lawyer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lawyer not found" });
    res.json({ message: "Lawyer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lawyer" });
  }
});

export default router;
