import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Temporary route to create admin (run once)
router.get('/seed', async (req, res) => {
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.default.hash('Admin@123', 10);
  await Admin.create({
    email: 'admin@malgani.com',
    password: hashedPassword,
  });
  res.send('✅ Admin created');
});


export default router;
