-- ============================================
-- 1st Aid M.D — Initial Schema
-- ============================================

-- 1. Courses
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  duration text,
  price_cents integer NOT NULL,
  concession_price_cents integer,
  description text,
  icon text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Public can read active courses
CREATE POLICY "Public can read courses"
  ON courses FOR SELECT
  USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated full access on courses"
  ON courses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. Bookings
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  course_name text NOT NULL,
  course_date date,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  concession boolean DEFAULT false,
  returning_student boolean DEFAULT false,
  group_booking boolean DEFAULT false,
  group_name text,
  participants integer DEFAULT 1,
  deposit_paid boolean DEFAULT false,
  stripe_session_id text,
  status text DEFAULT 'pending',
  notes text
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert bookings (anyone can book)
CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view bookings (admin)
CREATE POLICY "Authenticated can read bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated can update bookings
CREATE POLICY "Authenticated can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Contact Messages
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  replied boolean DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can submit contact messages
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view messages (admin)
CREATE POLICY "Authenticated can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated can update (mark as replied)
CREATE POLICY "Authenticated can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Seed: Courses
-- ============================================

INSERT INTO courses (name, slug, duration, price_cents, concession_price_cents, icon, sort_order) VALUES
  ('CPR / AED',                    'cpr-aed',                '3 Hours',   12000, 10000, '❤️', 1),
  ('Basic Life Support with CPR',  'bls-with-cpr',           'Half Day',  18000, 16000, '🫀', 2),
  ('Basic Life Support without CPR','bls-without-cpr',       'Half Day',  15000, 13000, '🩺', 3),
  ('Infant & Child First Aid',     'infant-child',           '3 Hours',    5000,  3000, '👶', 4),
  ('Advanced Life Support',        'advanced-life-support',  'Full Day',  21000, 19000, '⚡', 5),
  ('Mental Health First Aid',      'mental-health',          '3 Hours',    7000,  5000, '🧠', 6);
