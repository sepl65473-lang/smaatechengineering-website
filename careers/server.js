const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const sessionCookieSecure = process.env.SESSION_COOKIE_SECURE === 'true';

app.set('trust proxy', true);

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

// CSRF Protection
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
// Note: We'll apply this to the form route and the submission route specifically later
// to avoid blocking static files or GET API.

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
  proxy: isProduction,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: sessionCookieSecure,
    maxAge: 24 * 60 * 60 * 1000,
  } // 24 hours
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
app.use('/admin', adminRoutes);

// CSRF Token endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use('/api/apply', csrfProtection, applyRateLimit, applyRoutes);

// Redirect old paths to main career page
app.get('/career/index.html', (req, res) => res.redirect(301, '/career'));
app.get('/careers', (req, res) => res.redirect(301, '/career'));
app.get('/career/admin', (req, res) => {
  if (req.session.adminLoggedIn) {
    return res.redirect('/admin/dashboard');
  }

  return res.redirect('/admin/login');
});
app.get('/career/admin/login', (req, res) => res.redirect('/admin/login'));
app.get('/career/admin/dashboard', (req, res) => res.redirect('/admin/dashboard'));
app.get('/career/admin/jobs', (req, res) => res.redirect('/admin/jobs'));
app.get('/career/admin/applications', (req, res) => res.redirect('/admin/applications'));
app.get('/career/admin/logout', (req, res) => res.redirect('/admin/logout'));

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

    // 1. Create job_postings table (MySQL style converted to PostgreSQL)
    await db.query(`
      CREATE TABLE IF NOT EXISTS job_postings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        location VARCHAR(150) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        employment_type VARCHAR(50) DEFAULT 'Full-Time',
        description TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'job_postings'
            AND column_name = 'is_active'
            AND data_type <> 'boolean'
        ) THEN
          ALTER TABLE job_postings
            ALTER COLUMN is_active DROP DEFAULT,
            ALTER COLUMN is_active TYPE BOOLEAN USING (
              CASE
                WHEN LOWER(COALESCE(is_active::text, '1')) IN ('1', 'true', 't', 'yes', 'y', 'on') THEN TRUE
                ELSE FALSE
              END
            ),
            ALTER COLUMN is_active SET DEFAULT TRUE;
        END IF;
      END $$;
    `);

    // 2. Create career_applications table
    await db.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        position VARCHAR(100) NOT NULL,
        resume_path VARCHAR(255) NOT NULL,
        cover_letter TEXT,
        ip_address VARCHAR(45),
        status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new','reviewed','shortlisted','rejected')),
        submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create rate_limit_log table
    await db.query(`
      CREATE TABLE IF NOT EXISTS rate_limit_log (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        attempted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query('CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_time ON rate_limit_log (ip_address, attempted_at)');

    // 4. Create admin_login_attempts table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_login_attempts (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        attempted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query('CREATE INDEX IF NOT EXISTS idx_admin_attempts_ip_time ON admin_login_attempts (ip_address, attempted_at)');

    // 5. Robust Seeding Check
    const [jobRows] = await db.query('SELECT id FROM job_postings LIMIT 1');
    const jobsExist = jobRows && jobRows.length > 0;
    
    console.log(`Database sync check: jobs_exist=${jobsExist}`);

    if (!jobsExist) {
      console.log('Seeding database with sample jobs...');
      const sampleJobs = [
        ['Mechanical Engineer', 'Odisha, India', '2–5 Years', 'Full-Time', 'Responsible for design, analysis and maintenance of mechanical systems at project sites.'],
        ['Site Supervisor', 'Mumbai, India', '3–6 Years', 'Full-Time', 'Oversee daily site operations, manage workforce and ensure project timelines are met.'],
        ['QA/QC Engineer', 'Remote / On-site', '2–4 Years', 'Full-Time', 'Ensure quality standards are met across all engineering processes and documentation.']
      ];
      
      for (const job of sampleJobs) {
        await db.query(
          'INSERT INTO job_postings (title, location, experience, employment_type, description) VALUES ($1, $2, $3, $4, $5)',
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
