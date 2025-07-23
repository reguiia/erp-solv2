-- Insert initial user profiles (you'll need to create the auth users first via Supabase dashboard)
-- This script assumes you've already created users in the Supabase Auth dashboard

-- Example user profiles - replace the IDs with actual user IDs from your auth.users table
-- You can find these IDs in Supabase Dashboard > Authentication > Users

-- Admin User Profile
-- INSERT INTO user_profiles (id, role, full_name, phone, department) VALUES 
-- ('your-admin-user-id-here', 'admin', 'System Administrator', '+216 20 123 456', 'IT');

-- Manager User Profile  
-- INSERT INTO user_profiles (id, role, full_name, phone, department) VALUES
-- ('your-manager-user-id-here', 'manager', 'Project Manager', '+216 20 123 457', 'Operations');

-- Technician User Profile
-- INSERT INTO user_profiles (id, role, full_name, phone, department) VALUES
-- ('your-technician-user-id-here', 'technician', 'Senior Technician', '+216 20 123 458', 'Field Operations');

-- Sales Rep User Profile
-- INSERT INTO user_profiles (id, role, full_name, phone, department) VALUES
-- ('your-sales-user-id-here', 'sales_rep', 'Sales Representative', '+216 20 123 459', 'Sales');

-- Note: Uncomment and update the INSERT statements above with actual user IDs
-- after creating users in the Supabase Auth dashboard
