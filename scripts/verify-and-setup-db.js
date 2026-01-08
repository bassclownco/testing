#!/usr/bin/env node

// Script to verify database connection and create tables/user
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load .env.local file manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          process.env[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      }
    });
  }
}

loadEnvFile();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

console.log('🔗 Connecting to database...');
const sql = neon(DATABASE_URL);

async function verifyAndSetup() {
  try {
    // Test connection
    console.log('🔍 Testing database connection...');
    await sql`SELECT 1 as test`;
    console.log('✅ Database connection successful');
    
    console.log('🔧 Creating users table...');
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255),
          password TEXT NOT NULL,
          role VARCHAR(50) DEFAULT 'member' NOT NULL,
          email_verified BOOLEAN DEFAULT false,
          email_verification_token VARCHAR(255),
          reset_password_token VARCHAR(255),
          reset_password_expires TIMESTAMP,
          avatar TEXT,
          bio TEXT,
          phone VARCHAR(20),
          location VARCHAR(255),
          website VARCHAR(255),
          social_links JSONB,
          points_balance INTEGER DEFAULT 0,
          subscription VARCHAR(50) DEFAULT 'free',
          subscription_status VARCHAR(50) DEFAULT 'inactive',
          stripe_customer_id VARCHAR(255),
          subscription_id VARCHAR(255),
          subscription_period_start TIMESTAMP,
          subscription_period_end TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Create unique index on email
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS user_email_idx ON users(email)`;
    
    console.log('✅ Users table created successfully');
    
    // Delete existing user if exists (to recreate fresh)
    const email = 'david@solheim.tech';
    await sql`DELETE FROM users WHERE email = ${email}`;
    console.log('🗑️  Removed any existing admin user');
    
    // Create the admin user
    const password = 'bassclown25';
    const name = 'David Solheim';
    const role = 'bass-clown-admin';
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await sql`
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
        ${email}, 
        ${name}, 
        ${hashedPassword}, 
        ${role}, 
        true, 
        0, 
        'free', 
        'inactive',
        NOW(),
        NOW()
      ) RETURNING id, email, name, role, email_verified
    `;

    const user = result[0];
    console.log('');
    console.log('✅ Admin user created successfully:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Email Verified: ${user.email_verified}`);
    console.log(`   Password: ${password}`);
    console.log('');
    console.log('🎉 Database setup complete! You can now log in.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

verifyAndSetup()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });



