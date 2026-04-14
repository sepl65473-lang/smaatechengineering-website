const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const nodemailer = require('nodemailer');

// Configure Multer for Resume Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/resumes/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
  }
});

// SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/', upload.single('resume'), async (req, res) => {
  const { full_name, email, phone, position, cover_letter } = req.body;
  const ip_address = req.ip;

  try {
    // 1. Duplicate check (within 30 days) — PostgreSQL style with array destructuring
    const [existing] = await db.query(
      "SELECT id FROM career_applications WHERE email = $1 AND position = $2 AND submitted_at > NOW() - INTERVAL '30 days'",
      [email, position]
    );

    if (existing && existing.length > 0) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'You have already applied for this position within the last 30 days.' });
    }

    // 2. Insert into DB
    const resume_path = req.file ? req.file.path : '';
    await db.query(
      'INSERT INTO career_applications (full_name, email, phone, position, resume_path, cover_letter, ip_address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [full_name, email, phone, position, resume_path, cover_letter || '', ip_address]
    );

    // 3. Respond immediately
    res.json({ success: 'Application submitted successfully! Our HR team will contact you soon.' });

    // 4. Send emails in background (non-blocking)
    if (process.env.SMTP_HOST) {
      const adminMail = {
        from: `"${full_name}" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'Info@smaatechengineering.com',
        subject: `New Job Application - ${position}`,
        text: `New application received.\n\nName: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\n\nCover Letter:\n${cover_letter}`,
        attachments: req.file ? [{ filename: req.file.originalname, path: req.file.path }] : []
      };
      const applicantMail = {
        from: `"Smaatech HR" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Application Confirmation - Smaatech Engineering',
        text: `Dear ${full_name},\n\nThank you for applying for the ${position} position at Smaatech Engineering. We will review your profile and get back to you shortly.\n\nRegards,\nHR Team\nSmaatech Engineering Pvt Ltd`
      };
      transporter.sendMail(adminMail).catch(err => console.error('Admin email error:', err.message));
      transporter.sendMail(applicantMail).catch(err => console.error('Applicant email error:', err.message));
    }

  } catch (error) {
    console.error('Application Error:', error.message);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Failed to process application. Please try again later.' });
  }
});

module.exports = router;
