const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Middleware to check if admin is logged in
const isAdmin = (req, res, next) => {
  if (req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// Admin Login Page
router.get('/login', (req, res) => {
  if (req.session.adminLoggedIn) return res.redirect('/admin/dashboard');
  res.render('admin/login', { error: null });
});

// Admin Login Post (with Brute Force Lock)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const ip_address = req.ip;

  try {
    // 1. Check for recent failed attempts (5 in 15 mins)
    const [attempts] = await db.query(
      "SELECT COUNT(*) as count FROM admin_login_attempts WHERE ip_address = $1 AND attempted_at > NOW() - INTERVAL '15 minutes'",
      [ip_address]
    );

    if (attempts[0].count >= 5) {
      return res.render('admin/login', { error: 'Too many failed attempts. Account locked for 15 minutes.' });
    }

    // 2. Authenticate
    if (username === process.env.ADMIN_USER) {
      const match = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
      if (match) {
        // Success - Clear attempts
        await db.query('DELETE FROM admin_login_attempts WHERE ip_address = $1', [ip_address]);
        req.session.adminLoggedIn = true;
        return res.redirect('/admin/dashboard');
      }
    }

    // 3. Log failed attempt
    await db.query('INSERT INTO admin_login_attempts (ip_address) VALUES ($1)', [ip_address]);
    res.render('admin/login', { error: 'Invalid username or password' });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin Dashboard (Summary Cards)
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const [total] = await db.query('SELECT COUNT(*) as count FROM career_applications');
    const [today] = await db.query("SELECT COUNT(*) as count FROM career_applications WHERE DATE(submitted_at) = CURRENT_DATE");
    const [shortlisted] = await db.query("SELECT COUNT(*) as count FROM career_applications WHERE status = 'shortlisted'");
    const [rejected] = await db.query("SELECT COUNT(*) as count FROM career_applications WHERE status = 'rejected'");
    
    const [recentApps] = await db.query('SELECT * FROM career_applications ORDER BY submitted_at DESC LIMIT 5');
    
    res.render('admin/dashboard', {
      stats: {
        total: total[0].count,
        today: today[0].count,
        shortlisted: shortlisted[0].count,
        rejected: rejected[0].count
      },
      recentApps
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Dashboard Error');
  }
});

// Admin - Manage Job Postings (CRUD)
router.get('/jobs', isAdmin, async (req, res) => {
    const [jobs] = await db.query('SELECT * FROM job_postings ORDER BY created_at DESC');
    res.render('admin/jobs', { jobs });
});

router.post('/jobs/add', isAdmin, async (req, res) => {
    const { title, location, experience, employment_type, description } = req.body;
    await db.query(
        'INSERT INTO job_postings (title, location, experience, employment_type, description) VALUES ($1, $2, $3, $4, $5)',
        [title, location, experience, employment_type, description]
    );
    res.redirect('/admin/jobs');
});

router.post('/jobs/edit/:id', isAdmin, async (req, res) => {
    const { title, location, experience, employment_type, description } = req.body;
    await db.query(
        'UPDATE job_postings SET title=$1, location=$2, experience=$3, employment_type=$4, description=$5 WHERE id=$6',
        [title, location, experience, employment_type, description, req.params.id]
    );
    res.redirect('/admin/jobs');
});

router.post('/jobs/delete/:id', isAdmin, async (req, res) => {
    await db.query('DELETE FROM job_postings WHERE id = $1', [req.params.id]);
    res.redirect('/admin/jobs');
});

router.post('/jobs/toggle/:id', isAdmin, async (req, res) => {
    await db.query('UPDATE job_postings SET is_active = NOT is_active WHERE id = $1', [req.params.id]);
    res.redirect('/admin/jobs');
});

// Admin - View Applications (Filters)
router.get('/applications', isAdmin, async (req, res) => {
    const { position, status, date_range, date_from, date_to } = req.query;
    let query = 'SELECT * FROM career_applications WHERE 1=1';
    const params = [];
    let paramCount = 1;

    // Quick Filters
    if (date_range === 'today') {
        query += ' AND DATE(submitted_at) = CURRENT_DATE';
    } else if (date_range === 'week') {
        query += " AND submitted_at > NOW() - INTERVAL '7 days'";
    } else if (date_range === 'month') {
        query += " AND submitted_at > NOW() - INTERVAL '30 days'";
    }

    // Custom Filters
    if (position) {
        query += ` AND position = $${paramCount++}`;
        params.push(position);
    }
    if (status) {
        query += ` AND status = $${paramCount++}`;
        params.push(status);
    }
    if (date_from) {
        query += ` AND DATE(submitted_at) >= $${paramCount++}`;
        params.push(date_from);
    }
    if (date_to) {
        query += ` AND DATE(submitted_at) <= $${paramCount++}`;
        params.push(date_to);
    }

    query += ' ORDER BY submitted_at DESC';
    const [apps] = await db.query(query, params);
    
    // Get unique positions for filter dropdown
    const [positions] = await db.query('SELECT DISTINCT title as position FROM job_postings');

    res.render('admin/applications', { apps, positions, filters: req.query });
});

router.post('/applications/status/:id', isAdmin, async (req, res) => {
    await db.query('UPDATE career_applications SET status = $1 WHERE id = $2', [req.body.status, req.params.id]);
    res.redirect('/admin/applications');
});

module.exports = router;
