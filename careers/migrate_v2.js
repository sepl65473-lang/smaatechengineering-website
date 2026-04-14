const db = require('./config/db');

async function migrate() {
  console.log('Starting Database Migration V2...');

  try {
    // 1. Job Postings Table
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
    console.log('✅ table "job_postings" ready.');

    // 2. Career Applications Table
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
    console.log('✅ table "career_applications" ready.');

    // 3. Rate Limit Log Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS rate_limit_log (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        attempted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query('CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_time ON rate_limit_log (ip_address, attempted_at)');
    console.log('✅ table "rate_limit_log" ready.');

    // 4. Seed Initial Data (if empty)
    const [rows] = await db.query('SELECT id FROM job_postings LIMIT 1');
    if (rows.length === 0) {
      console.log('Seeding initial jobs...');
      await db.query(`
        INSERT INTO job_postings (title, location, experience, employment_type, description) VALUES
        ('Mechanical Engineer', 'Odisha, India', '2–5 Years', 'Full-Time', 'Responsible for design, analysis and maintenance of mechanical systems at project sites.'),
        ('Site Supervisor', 'Mumbai, India', '3–6 Years', 'Full-Time', 'Oversee daily site operations, manage workforce and ensure project timelines are met.'),
        ('QA/QC Engineer', 'Remote / On-site', '2–4 Years', 'Full-Time', 'Ensure quality standards are met across all engineering processes and documentation.')
      `);
      console.log('✅ Initial seed successful.');
    }

    console.log('🚀 Migration V2 successful.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
