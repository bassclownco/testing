#!/usr/bin/env node

// Script to fix/update existing admin user
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

const sql = neon(process.env.DATABASE_URL);

async function fixAdminUser() {
  try {
    console.log('🔧 Fixing admin user...');
    
    const email = 'david@solheim.tech';
    const password = 'bassclown25';
    const name = 'David Solheim';
    const role = 'bass-clown-admin';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the existing user
    const result = await sql`
      UPDATE users 
      SET 
        name = ${name},
        password = ${hashedPassword},
        role = ${role},
        email_verified = true,
        updated_at = NOW()
      WHERE email = ${email}
      RETURNING id, email, name, role, email_verified
    `;

    if (result.length > 0) {
      const user = result[0];
      console.log(`✅ Admin user updated successfully:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Email Verified: ${user.email_verified}`);
      console.log(`   Password: ${password}`);
      console.log('');
      console.log('🎉 You can now log in with these credentials!');
    } else {
      console.log(`❌ User with email ${email} not found. Run create-admin script first.`);
    }

  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
    process.exit(1);
  }
}

// Run the script
fixAdminUser()
  .then(() => {
    console.log('\n✅ Admin user fix completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Admin user fix failed:', error);
    process.exit(1);
  });



