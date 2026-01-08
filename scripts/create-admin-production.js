#!/usr/bin/env node

/**
 * Script to create admin user in production database
 * Reads DATABASE_URL from .env.production file
 */

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load .env.production file
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.production');
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
  } else {
    console.error('❌ .env.production file not found!');
    process.exit(1);
  }
}

loadEnvFile();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.production');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function createAdminUser() {
  try {
    console.log('🔗 Connecting to production database...');
    
    // Test connection
    await sql`SELECT 1 as test`;
    console.log('✅ Database connection successful\n');
    
    const email = 'david@solheim.tech';
    const password = 'bassclown25';
    const name = 'David Solheim';
    const role = 'bass-clown-admin';
    
    // Check if user already exists
    const existingUser = await sql`
      SELECT id, email, role, email_verified FROM users WHERE email = ${email}
    `;
    
    if (existingUser.length > 0) {
      console.log(`⚠️  User ${email} already exists`);
      console.log(`   Current role: ${existingUser[0].role}`);
      console.log(`   Email verified: ${existingUser[0].email_verified}`);
      
      // Update existing user
      const hashedPassword = await bcrypt.hash(password, 12);
      await sql`
        UPDATE users
        SET 
          password = ${hashedPassword},
          role = ${role},
          email_verified = true,
          name = ${name},
          updated_at = NOW()
        WHERE email = ${email}
      `;
      
      console.log('\n✅ Admin user updated successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${role}`);
      console.log(`   Email Verified: true`);
    } else {
      // Create new user
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
      
      const newUser = result[0];
      
      console.log('✅ Admin user created successfully!');
      console.log(`   ID: ${newUser.id}`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Name: ${newUser.name}`);
      console.log(`   Role: ${newUser.role}`);
      console.log(`   Email Verified: ${newUser.email_verified}`);
      console.log(`   Password: ${password}`);
    }
    
    console.log('\n🎉 Admin user is ready!');
    console.log(`   Login at: https://testing-f5sh.vercel.app/login`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAdminUser()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });


