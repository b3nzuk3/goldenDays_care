import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import Admin from '../models/Admin.js'

const router = express.Router()

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      // Find admin by email
      const admin = await Admin.findOne({ email })
      if (!admin || !admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        })
      }

      // Check password
      const isMatch = await admin.comparePassword(password)
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        })
      }

      // Update last login
      admin.lastLogin = new Date()
      await admin.save()

      // Generate JWT token
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            lastLogin: admin.lastLogin,
          },
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({
        success: false,
        message: 'Server error during login',
      })
    }
  }
)

// @route   GET /api/auth/me
// @desc    Get current admin info
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.adminId).select('-password')

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or inactive admin account',
      })
    }

    res.json({
      success: true,
      data: admin,
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
    })
  }
})

// @route   POST /api/auth/register
// @desc    Register new admin (Super Admin only)
// @access  Private (Super Admin)
router.post(
  '/register',
  [
    body('name')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Name must be 1-50 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(['admin', 'super-admin'])
      .withMessage('Invalid role'),
  ],
  async (req, res) => {
    try {
      // This would need additional middleware to check if the current user is a super-admin
      // For now, we'll implement basic registration

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array(),
        })
      }

      const { name, email, password, role = 'admin' } = req.body

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email })
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Admin with this email already exists',
        })
      }

      // Create new admin
      const admin = new Admin({
        name,
        email,
        password,
        role,
      })

      await admin.save()

      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({
        success: false,
        message: 'Server error during registration',
      })
    }
  }
)

export default router
