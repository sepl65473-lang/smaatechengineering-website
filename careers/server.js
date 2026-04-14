const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc:  ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:   ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc:    ["'self'", "data:", "https:"],
      connectSrc:["'self'"],
    },
  },
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting: 5 submissions per IP per hour for application endpoint
const applyRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many applications from this IP, please try again after an hour.' }
});

// Session Config
app.use(session({
  secret: process.env.SESSION_SECRET || 'smaatech-careers-secret-fallback',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// View Engine (EJS for Admin Panel)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const jobRoutes = require('./routes/jobs');
const applyRoutes = require('./routes/apply');
const adminRoutes = require('./routes/admin');

app.use('/api/jobs', jobRoutes);
app.use('/api/apply', applyRateLimit, applyRoutes);
app.use('/admin', adminRoutes);

// Redirect old paths to main career page
app.get('/career/index.html', (req, res) => res.redirect(301, '/career'));
app.get('/careers', (req, res) => res.redirect(301, '/career'));

// Main Career Page Route
app.get('/career', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'career.html'));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on our end. Please try again later.' });
});

// Database Sync & Server Start
const syncDB = async () => {
  // Start server immediately - don't wait/crash on DB
  app.listen(PORT, () => {
    console.log(`Careers server running on port ${PORT}`);
  });

  try {
    const db = require('./config/db');

    // 1. Create jobs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100),
        description TEXT,
        requirements TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create applications table
    await db.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        position VARCHAR(255) NOT NULL,
        resume_path VARCHAR(255) NOT NULL,
        cover_letter TEXT,
        status VARCHAR(50) DEFAULT 'new',
        ip_address VARCHAR(45),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Robust Seeding Check
    const jobCheck = await db.query('SELECT id FROM jobs LIMIT 1');
    const jobsExist = jobCheck.rows && jobCheck.rows.length > 0;
    
    console.log(`Database sync check: jobs_exist=${jobsExist}`);

    if (!jobsExist) {
      console.log('Seeding database with sample jobs...');
      const sampleJobs = [
        ['IoT Systems Engineer', 'Engineering', 'Remote / Mumbai', 'Full-time', 'Design and maintain IoT monitoring systems.', 'Node.js, AWS, IoT'],
        ['Full Stack Developer', 'Technology', 'Remote / Bhubaneswar', 'Full-time', 'Build and maintain web apps.', 'React, Node.js, PostgreSQL']
      ];
      
      for (const job of sampleJobs) {
        await db.query(
          'INSERT INTO jobs (title, department, location, type, description, requirements) VALUES ($1, $2, $3, $4, $5, $6)',
          job
        );
      }
      console.log('✅ Seeding complete.');
    }

    console.log('🚀 Database synchronized successfully.');
  } catch (error) {
    console.error('❌ DB sync error (server still running):', error.message);
  }
};

syncDB();
