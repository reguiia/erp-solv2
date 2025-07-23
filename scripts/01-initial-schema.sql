-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'technician', 'sales_rep');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'cancelled');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- User profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'technician',
  full_name TEXT,
  phone TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Lead sources
CREATE TABLE lead_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Leads table
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  address TEXT,
  source_id uuid REFERENCES lead_sources(id),
  status lead_status DEFAULT 'new',
  assigned_to uuid REFERENCES user_profiles(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  address TEXT,
  tax_id TEXT,
  created_from_lead uuid REFERENCES leads(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view customers" ON customers
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Project types
CREATE TABLE project_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_on_grid BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  customer_id uuid REFERENCES customers(id) NOT NULL,
  project_type_id uuid REFERENCES project_types(id),
  status project_status DEFAULT 'draft',
  manager_id uuid REFERENCES user_profiles(id),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view projects" ON projects
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pending',
  assigned_to uuid REFERENCES user_profiles(id),
  due_date DATE,
  priority INTEGER DEFAULT 1,
  created_by uuid REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tasks" ON tasks
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Communications table
CREATE TABLE communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id),
  customer_id uuid REFERENCES customers(id),
  project_id uuid REFERENCES projects(id),
  type TEXT NOT NULL, -- 'email', 'phone', 'meeting', 'note'
  subject TEXT,
  content TEXT,
  created_by uuid REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view communications" ON communications
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Tags table
CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Lead tags junction table
CREATE TABLE lead_tags (
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (lead_id, tag_id)
);

-- Insert default data
INSERT INTO lead_sources (name, description) VALUES
  ('Website', 'Leads from company website'),
  ('Referral', 'Customer referrals'),
  ('Social Media', 'Social media campaigns'),
  ('Trade Show', 'Industry events and trade shows'),
  ('Cold Call', 'Outbound sales calls');

INSERT INTO project_types (name, description, is_on_grid) VALUES
  ('Residential On-Grid', 'Residential solar installations connected to grid', true),
  ('Industrial On-Grid', 'Large scale industrial solar installations', true),
  ('Agricultural Off-Grid', 'Off-grid solar systems for agricultural use', false);

INSERT INTO tags (name, color) VALUES
  ('Hot Lead', '#EF4444'),
  ('High Value', '#F59E0B'),
  ('Qualified', '#10B981'),
  ('Follow Up', '#8B5CF6'),
  ('Urgent', '#DC2626');
