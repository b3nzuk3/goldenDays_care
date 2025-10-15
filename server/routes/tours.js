import express from 'express'
import { body, validationResult } from 'express-validator'
import ScheduledTour from '../models/ScheduledTour.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Validation rules for tour submission
const tourValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be 1-50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be 1-50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('preferredDate').isISO8601().withMessage('Please provide a valid date'),
  body('preferredTime')
    .isIn(['morning', 'afternoon', 'evening'])
    .withMessage('Preferred time must be morning, afternoon, or evening'),
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
]

// @route   POST /api/tours
// @desc    Submit new tour request
// @access  Public
router.post('/', tourValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const tour = new ScheduledTour(req.body)
    await tour.save()

    res.status(201).json({
      success: true,
      message: 'Tour request submitted successfully',
      data: tour,
    })
  } catch (error) {
    console.error('Error submitting tour request:', error)
    res.status(500).json({
      success: false,
      message: 'Error submitting tour request',
    })
  }
})

// @route   GET /api/tours
// @desc    Get all tour requests (Admin only)
// @access  Private (Admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query

    const filter = {}
    if (status) filter.status = status

    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const tours = await ScheduledTour.find(filter)
      .populate('confirmedBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))

    const total = await ScheduledTour.countDocuments(filter)

    res.json({
      success: true,
      data: tours,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
      },
    })
  } catch (error) {
    console.error('Error fetching tours:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
    })
  }
})

// @route   GET /api/tours/:id
// @desc    Get single tour request
// @access  Private (Admin)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const tour = await ScheduledTour.findById(req.params.id).populate(
      'confirmedBy',
      'name email'
    )

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour request not found',
      })
    }

    res.json({
      success: true,
      data: tour,
    })
  } catch (error) {
    console.error('Error fetching tour:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
    })
  }
})

// @route   PUT /api/tours/:id/status
// @desc    Update tour status
// @access  Private (Admin)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, notes } = req.body

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      })
    }

    const tour = await ScheduledTour.findById(req.params.id)
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour request not found',
      })
    }

    tour.status = status
    if (notes) tour.notes = notes

    if (status === 'confirmed') {
      tour.confirmedBy = req.admin._id
      tour.confirmedAt = new Date()
    }

    await tour.save()
    await tour.populate('confirmedBy', 'name email')

    res.json({
      success: true,
      message: 'Tour status updated successfully',
      data: tour,
    })
  } catch (error) {
    console.error('Error updating tour status:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating tour status',
    })
  }
})

// @route   DELETE /api/tours/:id
// @desc    Delete tour request
// @access  Private (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const tour = await ScheduledTour.findById(req.params.id)
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour request not found',
      })
    }

    await ScheduledTour.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Tour request deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting tour:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting tour',
    })
  }
})

// @route   GET /api/tours/stats/overview
// @desc    Get tour statistics
// @access  Private (Admin)
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const stats = await ScheduledTour.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const totalTours = await ScheduledTour.countDocuments()
    const recentTours = await ScheduledTour.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    })

    const statusCounts = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count
      return acc
    }, {})

    res.json({
      success: true,
      data: {
        total: totalTours,
        recent: recentTours,
        byStatus: {
          pending: statusCounts.pending || 0,
          confirmed: statusCounts.confirmed || 0,
          completed: statusCounts.completed || 0,
          cancelled: statusCounts.cancelled || 0,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching tour stats:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching tour statistics',
    })
  }
})

export default router
