// Load environment variables FIRST
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from './config/database.js'

// Import routes
import authRoutes from './routes/auth.js'
import photoRoutes from './routes/photos.js'
import tourRoutes from './routes/tours.js'

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/', limiter)

// CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        process.env.MAIN_SITE_URL,
        process.env.ADMIN_DASHBOARD_URL,
        'https://golden-days-care-dsg1.vercel.app', // Temporary hardcode
      ].filter(Boolean) // Remove any undefined values
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3004',
        'http://localhost:5173',
        'http://localhost:8080',
      ]

// Debug logging
console.log('Environment:', process.env.NODE_ENV)
console.log('MAIN_SITE_URL:', process.env.MAIN_SITE_URL)
console.log('ADMIN_DASHBOARD_URL:', process.env.ADMIN_DASHBOARD_URL)
console.log('Allowed Origins:', allowedOrigins)

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log('CORS blocked origin:', origin)
        console.log('Allowed origins:', allowedOrigins)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Golden Days Admin API is running',
    timestamp: new Date().toISOString(),
  })
})

// Debug endpoint to check environment variables
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    mainSiteUrl: process.env.MAIN_SITE_URL,
    adminDashboardUrl: process.env.ADMIN_DASHBOARD_URL,
    allowedOrigins: allowedOrigins,
    origin: req.headers.origin
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api/tours', tourRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 10MB.',
    })
  }

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message,
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Admin API: http://localhost:${PORT}/api`)
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`)
})

export default app
