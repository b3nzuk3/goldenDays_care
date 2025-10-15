import mongoose from 'mongoose'
import Admin from '../models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const setupAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    })
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email)
      process.exit(0)
    }

    // Create default admin
    const admin = new Admin({
      name: 'Golden Days Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'super-admin',
    })

    await admin.save()
    console.log('Default admin created successfully:')
    console.log('Email:', admin.email)
    console.log('Password:', process.env.ADMIN_PASSWORD)
    console.log('Role:', admin.role)
  } catch (error) {
    console.error('Error setting up admin:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

setupAdmin()
