-- Create Admin User - Paste this into Neon SQL Editor

-- Insert or update admin user
INSERT INTO users (
  email,
  name,
  password,
  role,
  email_verified,
  points_balance,
  subscription,
  subscription_status,
  created_at,
  updated_at
) VALUES (
  'Nick@bassclown.com',
  'Nick',
  '$2b$12$TqlgmHX0jtoDSpwjzNEZXelCSFbeZc2oGx103slsnSmNYGgmFfaDe',
  'bass-clown-admin',
  true,
  0,
  'free',
  'inactive',
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = 'bass-clown-admin',
  email_verified = true,
  name = 'Nick',
  updated_at = NOW();

-- Verify user was created/updated
SELECT id, email, name, role, email_verified, created_at 
FROM users 
WHERE email = 'Nick@bassclown.com';
