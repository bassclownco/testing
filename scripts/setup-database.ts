#!/usr/bin/env bun

import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!)

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...')
    
    // Create users table directly
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
    `
    
    // Create unique index on email
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS user_email_idx ON users(email)`
    
    console.log('✅ Users table created successfully')
    
    // Now create the admin user
    const email = 'david@solheim.tech'
    const password = 'bassclown25'
    const name = 'David Solheim'
    const role = 'bass-clown-admin'

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Check if user already exists
    const existingUser = await sql`
      SELECT id, email, role FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      console.log(`❌ User with email ${email} already exists`)
      
      // Update existing user to admin role if not already admin
      if (existingUser[0].role !== role) {
        await sql`
          UPDATE users 
          SET role = ${role}, updated_at = NOW()
          WHERE email = ${email}
        `
        
        console.log(`✅ Updated existing user ${email} to admin role`)
      } else {
        console.log(`✅ User ${email} already has admin role`)
      }
      return
    }

    // Create the admin user
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
      ) RETURNING id, email, name, role
    `

    const newUser = result[0]

    console.log(`✅ Admin user created successfully:`)
    console.log(`   ID: ${newUser.id}`)
    console.log(`   Email: ${newUser.email}`)
    console.log(`   Name: ${newUser.name}`)
    console.log(`   Role: ${newUser.role}`)
    console.log(`   Password: ${password}`)
    console.log('')
    console.log('🎉 You can now log in with these credentials!')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    process.exit(1)
  }
}

// Run the script
setupDatabase()
  .then(() => {
    console.log('\n✅ Database setup completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }) 