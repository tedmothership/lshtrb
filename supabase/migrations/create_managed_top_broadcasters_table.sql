/*
  # Create managed_top_broadcasters table

  This migration creates a table to store the usernames of top broadcasters,
  allowing them to be managed remotely via Supabase Studio.

  1. New Tables
    - `managed_top_broadcasters`
      - `id` (uuid, primary key): Unique identifier for each entry.
      - `username` (text, unique, not null): The username of the broadcaster.
      - `priority` (integer, default 0): An optional field to order broadcasters. Higher numbers can mean higher priority.
      - `created_at` (timestamptz, default now()): Timestamp of when the entry was created.

  2. Security
    - Enable RLS on `managed_top_broadcasters` table.
    - Add policy for public anonymous and authenticated users to read the broadcasters list.
    - Management (insert, update, delete) of this table should be done via Supabase Studio by an authorized user.
*/

CREATE TABLE IF NOT EXISTS managed_top_broadcasters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE managed_top_broadcasters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read top broadcasters"
  ON managed_top_broadcasters
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- For data management, use Supabase Studio or create specific policies for authenticated users if needed.
-- Example: Allow authenticated users to manage all entries (use with caution or restrict by role)
-- CREATE POLICY "Authenticated users can manage top broadcasters"
--   ON managed_top_broadcasters
--   FOR ALL
--   TO authenticated
--   USING (true)
--   WITH CHECK (true);
