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
app.use(helmet());
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
  try {
    const db = require('./config/db');
    await db.query(`
      CREATE TABLE IF NOT EXISTS job_postings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        experience VARCHAR(100),
        employment_type VARCHAR(100),
        description TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
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
      );
    `);
    // Insert sample job if empty
    const jobCount = await db.query('SELECT COUNT(*) FROM jobs');
    if (parseInt(jobCount.rows[0].count) === 0) {
      await db.query(`
        INSERT INTO jobs (title, department, location, type, description, requirements)
        VALUES ('System Engineer', 'Engineering', 'Remote/Mumbai', 'Full-time', 
                'Responsible for maintaining and optimizing our cold storage IoT infrastructure.', 
                '3+ years experience, Node.js, AWS, IoT knowledge')
      `);
      console.log('Sample job created.');
    }

    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Careers server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
    process.exit(1);
  }
};

syncDB();
