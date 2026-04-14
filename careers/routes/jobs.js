const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all active job postings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM job_postings WHERE is_active = true ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch job postings' });
  }
});

module.exports = router;
