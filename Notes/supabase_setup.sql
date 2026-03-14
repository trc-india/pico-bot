-- ═══════════════════════════════════════════════════════════════
-- PICO BOT Website — Supabase SQL Queries
-- Run these in your Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
-- TABLE 1: call_bookings
-- Stores "Book a Call" requests from the hero section
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS call_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  child_age TEXT,
  interest TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE call_bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT (public form submissions)
CREATE POLICY "Allow public inserts on call_bookings"
  ON call_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can SELECT/UPDATE/DELETE
CREATE POLICY "Allow authenticated users to read call_bookings"
  ON call_bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update call_bookings"
  ON call_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete call_bookings"
  ON call_bookings
  FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- TABLE 2: contact_submissions
-- Stores contact form submissions from the /contact page
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  kit_interest TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT (public form submissions)
CREATE POLICY "Allow public inserts on contact_submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can SELECT/UPDATE/DELETE
CREATE POLICY "Allow authenticated users to read contact_submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update contact_submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete contact_submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- INDEXES for better query performance
-- ─────────────────────────────────────────────────────────────
CREATE INDEX idx_call_bookings_status ON call_bookings(status);
CREATE INDEX idx_call_bookings_date ON call_bookings(preferred_date);
CREATE INDEX idx_call_bookings_created ON call_bookings(created_at DESC);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);


-- ─────────────────────────────────────────────────────────────
-- HELPFUL QUERIES (for admin use, don't run during setup)
-- ─────────────────────────────────────────────────────────────

-- View all pending call bookings:
-- SELECT * FROM call_bookings WHERE status = 'pending' ORDER BY preferred_date ASC;

-- View all new contact submissions:
-- SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY created_at DESC;

-- Mark a booking as confirmed:
-- UPDATE call_bookings SET status = 'confirmed', updated_at = NOW() WHERE id = 'UUID_HERE';

-- Mark a message as read:
-- UPDATE contact_submissions SET status = 'read', updated_at = NOW() WHERE id = 'UUID_HERE';

-- Count bookings by status:
-- SELECT status, COUNT(*) FROM call_bookings GROUP BY status;

-- Count contacts by status:
-- SELECT status, COUNT(*) FROM contact_submissions GROUP BY status;
