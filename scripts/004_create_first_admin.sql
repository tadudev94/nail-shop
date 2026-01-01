-- Instructions: Replace 'your-email@example.com' with your actual email address
-- This script should be run AFTER you have created your account via signup

-- Update a specific user to be admin
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';

-- Verify the admin user was created
select id, email, role, created_at
from public.profiles
where role = 'admin';
